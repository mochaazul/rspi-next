#!/bin/bash

set -e

VERSION=""
STAGE="dev"

read -p "Enter Version example -> 1.0.195 : " VERSION
read -p "Enter Stage (staging / dev / prod) : " STAGE

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 011876906689.dkr.ecr.us-west-2.amazonaws.com
docker buildx build --platform linux/amd64 -f ./Dockerfile --build-arg stage=$STAGE --no-cache -t rebelworks/rspi-next:latest .

if [ "$STAGE" == "dev" ]; then
  docker tag rebelworks/rspi-next:latest 011876906689.dkr.ecr.us-west-2.amazonaws.com/rebelworks/rspi:$VERSION
  docker push 011876906689.dkr.ecr.us-west-2.amazonaws.com/rebelworks/rspi:$VERSION
  ssh ubuntu@52.88.6.210 'bash -s' < r-deploy.sh $VERSION dev
  elif [ "$STAGE" == "staging" ]; then
  docker tag rebelworks/rspi-next:latest 011876906689.dkr.ecr.us-west-2.amazonaws.com/rebelworks/rspi:$VERSION
  docker push 011876906689.dkr.ecr.us-west-2.amazonaws.com/rebelworks/rspi:$VERSION
  ssh -i ./rspi-node-1-dev.pem rspi-node1-dev@34.101.140.50 'bash -s' < r-deploy.sh $VERSION staging
  elif [ "$STAGE" == "prod" ]; then
  docker tag rebelworks/rspi-next:latest gcr.io/rspi-3122/rebelworks/rspi-web-prod:$VERSION-next-prod
  docker push gcr.io/rspi-3122/rebelworks/rspi-web-prod:$VERSION-next-prod
  echo "image pushed: gcr.io/rspi-3122/rebelworks/rspi-web-prod:$VERSION-next-prod"
fi