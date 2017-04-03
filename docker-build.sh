#!/usr/bin/env bash

meteor build . --directory --architecture os.linux.x86_64
cd Dockerfiles/
docker build -t vitorenesduarte/lsim-dash -f Dockerfiles/lsim-dash .
