APISERVER=$(kubectl config view |
            grep "server:" |
            grep -Eo "https://[0-9\.:]+")
TOKEN=$(kubectl describe secret |
        grep "token:" |
        awk '{print $2}')

APISERVER=${APISERVER} TOKEN=${TOKEN} meteor
