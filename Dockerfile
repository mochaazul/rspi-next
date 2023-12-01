FROM node:18-alpine as build_stage

WORKDIR /app

COPY package*.json ./
COPY . .
RUN yarn build

# PACKAGING STAGE

FROM node:18-alpine as packaging_stage

WORKDIR /app

COPY --from=build_stage /app/.next/standalone ./
COPY --from=build_stage /app/public ./public
COPY --from=build_stage /app/.next/static ./.next/static

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

EXPOSE 3001

CMD [ "node", "./server.js" ]