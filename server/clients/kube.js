import request from 'request';
import async from 'async';

export {KubeClient};

class KubeClient {
    constructor() {
        var host = process.env.APISERVER;
        var token = process.env.TOKEN;

        // @todo add certificate instead of this
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

        this._host = host;
        this._token = token;
        this.loadRedisConfig();
    }

    redisConfig() {
        return this._redisConfig;
    }

    fetchDeployments() {

        const self = this;
        var options = self._getOptions('/apis/extensions/v1beta1/namespaces/default/deployments');

        // fetch lsim info
        request(options, Meteor.bindEnvironment(function (err, response, body) {
            if (err) {
                console.log('Error fetching deployments from Kubernetes:', err);
            } else {
                var value = JSON.parse(body);
                for (var i = 0; i < value.items.length; i++) {
                    const item = value.items[i];
                    const name = item.metadata.name;
                    const timestamp = name.split("-")[1];

                    if (name.includes('lsim') && !name.includes('lsim-dash')) {
                        options = self._getOptions('/api/v1/pods?labelSelector=tag%3Dlsim,timestamp%3D' + timestamp)

                        request(options, Meteor.bindEnvironment(function (err, response, body) {
                            if (err) {
                                console.log('Error fetching pods from Kubernetes:', err);
                            } else {
                                value = JSON.parse(body);

                                var lsims = [];
                                var statuz = {};

                                for (var i = 0; i < value.items.length; i++) {
                                    const item = value.items[i];

                                    // add status to set of status
                                    const status = item.status.phase;
                                    statuz[status] = true;

                                    // save pod name and ip
                                    const name = item.metadata.name;
                                    const podIP = item.status.podIP;
                                    lsims.push({
                                        name: name,
                                        ip: podIP
                                    });
                                }

                                var calls = [];

                                for (var i = 0; i < lsims.length; i++) {
                                    const lsim = lsims[i];
                                    const path = 'http://' + lsim.ip + ':8080/membership';

                                    calls.push(function (callback) {
                                        request(path, function (err, response, body) {
                                            if (err) {
                                                return callback(err);
                                            } else {
                                                callback(null, {key: lsim.ip, value: JSON.parse(body)});
                                            }
                                        });
                                    });
                                }

                                async.parallel(calls, Meteor.bindEnvironment(function (err, result) {
                                    if (err) {
                                        console.log('Error fetching membership from lsims', err);
                                    } else {

                                        var graph = {};

                                        for (var i = 0; i < result.length; i++) {
                                            const name = 'lsim-6866@' + result[i]['key'].replace('.', ':');
                                            const membership = result[i]['value'];

                                            graph[name] = membership;
                                        }

                                        const data = {
                                            timestamp: timestamp,
                                            statuz: Object.keys(statuz),
                                            number: lsims.length,
                                            graph: graph
                                        };

                                        console.log(data);

                                        Meteor.call('running.insert', timestamp, data);
                                    }
                                }));
                            }
                        }));
                    }
                }
            }
        }));
    }

    loadRedisConfig() {
        const self = this;
        const options = self._getOptions('/api/v1/pods?labelSelector=tag%3Dredis')

        // fetch redis config
        request(options, function (err, response, body) {
            if (err) {
                console.log('Error fetching redis config from Kubernetes:', err);
            } else {
                const value = JSON.parse(body);
                const items = value.items;
                assert(items.length == 1);
                const item = items[0];
                const podIP = item.status.podIP;

                self._redisConfig = {
                    host: podIP,
                    port: 6379
                }
            }
        });
    }

    _getOptions(url) {
        return {
            url: this._host + url,
            headers: {
                Authorization: 'Bearer ' + this._token
            }
        }
    }
}