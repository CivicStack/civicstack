FROM node:argon
MAINTAINER Matías Lescano <matias@democraciaenred.org>

RUN apt-get update && \
  apt-get install -y libkrb5-dev && \
  npm config set python python2.7

COPY package.json /usr/src/

WORKDIR /usr/src

RUN npm install --quiet --unsafe-perm

EXPOSE 3000

CMD ["make"]
