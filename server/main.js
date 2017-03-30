import {Meteor} from 'meteor/meteor';
import redis from 'redis';
import async from 'async';

const REDIS_INTERVAL = 5000;
const REDIS_CONFIG = redisConfig();

Meteor.startup(() => {
    scheduleRedisPull();
});

function redisConfig() {
    var redisHost = "127.0.0.1";
    var redisPort = 6379;
    const orchestration = process.env.ORCHESTRATION;

    if (orchestration) {
        // @todo pull redis config
        console.log("ORCHESTRATED, should pull redis config");
    }

    return {
        "host": redisHost,
        "port": redisPort
    };
}

function scheduleRedisPull() {
    Meteor.setInterval(
        function () {
            // create redis client
            const client = redis.createClient(REDIS_CONFIG);

            // only fetch rsg logs for now
            const pattern = "*rsg*";

            client.keys(pattern, Meteor.bindEnvironment(function (err, keys) {
                if (err) {
                    console.log("Error fetching keys from Redis:", err);
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
                            console.log("Error fetching value from Redis:", err);
                        } else {
                            for (var i = 0; i < result.length; i++) {
                                const key = result[i]['key'];
                                const value = result[i]['key'];
                                Meteor.call('done.insert', key, value)
                            }
                        }

                        client.quit();
                    }));
                }

            }));
        },
        REDIS_INTERVAL
    );
}