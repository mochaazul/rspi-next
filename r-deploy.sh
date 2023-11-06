#!/bin/bash
cd deploy 
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 011876906689.dkr.ecr.us-west-2.amazonaws.com
sed -i~ "/^WEB_IMAGE=/s/=.*/=011876906689.dkr.ecr.us-west-2.amazonaws.com\/rebelworks\/rspi:1.0.$1-web-$2/g" .env
docker container kill $(docker container ls -q --filter name=rspi_web)
docker compose up -d