# Build environment
FROM --platform=linux/amd64 node:16.15-alpine as build

RUN apk update && apk add --no-cache git
ARG stage=dev
WORKDIR /app
COPY package.json ./
COPY node_modules ./
COPY . ./
RUN yarn build:${stage}

# docker environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]