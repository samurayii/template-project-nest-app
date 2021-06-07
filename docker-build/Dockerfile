FROM node:14-alpine3.13

COPY app /app-template
COPY config.toml /app-template/config.toml

RUN cd /app-template && \
    npm ci && \
    node app.js -v

WORKDIR /app-template

ENTRYPOINT [ "node" ]
CMD [ "app.js", "--config", "config.toml" ]