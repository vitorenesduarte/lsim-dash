import {Meteor} from 'meteor/meteor';
import {KubeClient} from './clients/kube';
import {RedisClient} from './clients/redis';

const KUBE_INTERVAL = 3; // seconds
const KUBE_CLI = new KubeClient();
const REDIS_INTERVAL = 10; // seconds

Meteor.startup(() => {
    scheduleKubePull();
    scheduleRedisPull();
});

function scheduleKubePull() {
    Meteor.setInterval(
        function () {
            KUBE_CLI.fetchDeployments();
        },
        KUBE_INTERVAL * 1000
    );
}

function scheduleRedisPull() {
    Meteor.setInterval(
        function () {
            const REDIS_CONFIG = KUBE_CLI.redisConfig();
            const REDIS_CLI = new RedisClient(REDIS_CONFIG);
            REDIS_CLI.fetchMetrics();
        },
        REDIS_INTERVAL * 1000
    );
}