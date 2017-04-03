import redis from 'redis';
import async from 'async';

class RedisClient {
    constructor(config) {
        check(config, Object);
        this._config = config;
    }

    fetchMetrics() {
        const client = redis.createClient(this._config);
        // only fetch rsg logs for now
        const pattern = '*rsg*';

        client.keys(pattern, Meteor.bindEnvironment(function (err, keys) {
            if (err) {
                console.log('Error fetching keys from Redis:', err);
            } else {
                var calls = [];

                for (var i = 0; i < keys.length; i++) {
                    const key = keys[i];

                    calls.push(function (callback) {
                        client.get(key, function (err, value) {
                            if (err) {
                                return callback(err);
                            }

                            callback(null, {key: key, value: value});
                        });
                    });
                }

                async.parallel(calls, Meteor.bindEnvironment(function (err, result) {
                    if (err) {
                        console.log('Error fetching value from Redis:', err);
                    } else {
                        for (var i = 0; i < result.length; i++) {
                            const key = result[i]['key'];
                            const timestamp = key.split("/")[0];
                            const data = JSON.parse(result[i]['value']);
                            Meteor.call('done.insert', timestamp, data)
                        }
                    }

                    client.quit();
                }));
            }

        }));
    }
}

export {RedisClient};