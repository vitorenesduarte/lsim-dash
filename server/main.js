import {Meteor} from 'meteor/meteor';
import {KubeClient} from './kube';
import {RedisClient} from './redis';

const KUBE_INTERVAL = 3; // seconds
const KUBE_CONFIG = kubeConfig();
const REDIS_INTERVAL = 10; // seconds
const REDIS_CONFIG = redisConfig();

Meteor.startup(() => {
    scheduleKubePull();
    scheduleRedisPull();
});

function kubeConfig() {
    var kubeHost = "https://192.168.42.208:8443";
    var kubeToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tOWJmMDYiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImFhMDhiZDAzLTE1NzEtMTFlNy04NGVhLTUyNTQwMDFiYzczYiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.Bckyzt0xZIxO2Tjh5t-CpHJtd9qgknzx8m6SM8KznGo2stDcU-rxC4V8mLKtHwkuMMJynvcfm7gjBx_8GaDLPhJQBgpx3H6Z1lsz6yNN9MhPJEE1Qg9AGIcSNgFlksOrsD_ESXTZzkNpA9ZSIlY-Q4oFXGfcgj7JwTg0_TmSENVCPuAdsACC2gfKrq0Z1v-N5y9uQYMM3F9HJkg_q8zhM67FGDVJF1UI9YR-TMRsFYLJwihLT-bPIQrQy52CzViq1XPGpQhpvxHxv6Az89DZELzV34iPM47ZL-yTqYdYar3DmH_BoKQwTcSzRqq6CEwOg5BF4etDswMfisFGQc4afA";
    const orchestration = process.env.ORCHESTRATION;

    if (orchestration) {
        // @todo pull kube config
        console.log('ORCHESTRATED, should pull kube config');
    }

    return {
        host: kubeHost,
        token: kubeToken
    }
}

function redisConfig() {
    var redisHost = '127.0.0.1';
    var redisPort = 6379;
    const orchestration = process.env.ORCHESTRATION;

    if (orchestration) {
        // @todo pull redis config
        console.log('ORCHESTRATED, should pull redis config');
    }

    return {
        host: redisHost,
        port: redisPort
    };
}

function scheduleKubePull() {
    Meteor.setInterval(
        function () {
            const client = new KubeClient(KUBE_CONFIG);
            client.fetchDeployments();
        },
        KUBE_INTERVAL * 1000
    );
}

function scheduleRedisPull() {
    Meteor.setInterval(
        function () {
            const client = new RedisClient(REDIS_CONFIG);
            client.fetchMetrics();
        },
        REDIS_INTERVAL * 1000
    );
}