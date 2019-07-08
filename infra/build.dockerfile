FROM node:12.6.0-alpine
MAINTAINER Sean Morris <sean@seanmorr.is>
WORKDIR /app

CMD npm install && npm run build
