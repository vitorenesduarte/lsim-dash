import request from 'request';

export {KubeClient};

class KubeClient {
    constructor() {
        var host = process.env.APISERVER;
        var token = process.env.TOKEN;

        // @todo add certificate instead of this
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

        this._host = host;
        this._token = token;
        this._fetchRedisConfig();
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

                    if (name.includes('lsim')) {
                        options = self._getOptions('/api/v1/pods?labelSelector=timestamp%3D' + timestamp)

                        request(options, Meteor.bindEnvironment(function (err, response, body) {
                            if (err) {
                                console.log('Error fetching pods from Kubernetes:', err);
                            } else {
                                value = JSON.parse(body);

                                for (var i = 0; i < value.items.length; i++) {
                                    const item = value.items[i];
                                    console.log(item);
                                    const name = item.metadata.name;
                                    delete item.metadata.labels['pod-template-hash'];
                                    const labels = item.metadata.labels;
                                    const status = item.status.phase;
                                    const podIP = item.status.podIP;
                                    console.log(name, labels, status, podIP)
                                }
                            }
                        }));
                    }
                }
            }
        }));
    }

    _getOptions(url) {
        return {
            url: this._host + url,
            headers: {
                Authorization: 'Bearer ' + this._token
            }
        }
    }

    _fetchRedisConfig() {
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
                    // @todo
                    //host: podIP,
                    host: '127.0.0.1',
                    port: 6379
                }
            }
        });
    }
}