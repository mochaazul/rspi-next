#!/bin/bash

VERSION=""
STAGE="dev"

read -p "Enter Version : " VERSION
read -p "Enter Stage (staging / dev / prod) : " STAGE

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 011876906689.dkr.ecr.us-west-2.amazonaws.com
docker buildx build --platform linux/amd64 -f ./Dockerfile --build-arg stage=$STAGE --no-cache -t rebelworks/rspi:latest .
docker tag rebelworks/rspi:latest 011876906689.dkr.ecr.us-west-2.amazonaws.com/rebelworks/rspi:1.0.$VERSION-web-$STAGE
docker push 011876906689.dkr.ecr.us-west-2.amazonaws.com/rebelworks/rspi:1.0.$VERSION-web-$STAGE

if [ "$STAGE" == "dev" ]; then
  ssh ubuntu@52.88.6.210 'bash -s' < r-deploy.sh $VERSION dev
elif [ "$STAGE" == "staging" ]; then
  ssh -i ./rspi-node-1-dev.pem rspi-node1-dev@34.101.140.50 'bash -s' < r-deploy.sh $VERSION staging
  # ssh ubuntu@52.88.6.210 'bash -s' < r-deploy.sh $VERSION dev
elif [ "$STAGE" == "prod" ]; then
  echo "Production ENV not configured"
  # ssh ubuntu@52.88.6.210 'bash -s' < r-deploy.sh $VERSION dev
fi
