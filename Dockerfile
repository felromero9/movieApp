# We can run a first stage just to compile the frontend.
FROM node:alpine as buildStep

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Then in the actual image step we copy the built files
FROM node:alpine
WORKDIR /app
COPY --from=buildStep /app/public /app/public
COPY --from=buildStep /app/server /app/server
COPY --from=buildStep /app/package*.json /app

RUN npm install --production

RUN apk add --update redis supervisor

COPY ./config/supervisor.conf /etc/supervisord.conf
EXPOSE 8080

CMD ["/usr/bin/supervisord"]