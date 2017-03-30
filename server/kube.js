import request from 'request';

export {KubeClient};

class KubeClient {
    constructor(config) {
        check(config.host, String);
        check(config.token, String);

        this._host = config.host;
        this._token = config.token;
    }

    fetchDeployments() {
        // @todo add certificate instead of this
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

        const options = {
            url: this._host + '/apis/extensions/v1beta1/namespaces/default/deployments',
            headers: {
                Authorization: 'Bearer ' + this._token
            }
        };

        request(options, Meteor.bindEnvironment(function (err, response, body) {
            if (err) {
                console.log('Error fetching deployments from Kubernetes:', err);
            } else {
                // clear current running
                Meteor.call('running.clear', function () {

                    var value = JSON.parse(body);
                    for (var i = 0; i < value.items.length; i++) {
                        const item = value.items[i];
                        const name = item.metadata.name;

                        if (name.includes('lsim')) {

                            const timestamp = name.split("-")[1];

                            const data = {
                                'runningReplicas': item.status.replicas,
                                'desiredReplicas': item.spec.replicas
                            };

                            Meteor.call('running.insert', timestamp, data);
                        }
                    }
                });
            }
        }));

    }
}