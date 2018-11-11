FROM node:carbon
RUN mkdir -p workspace
WORKDIR workspace
RUN mkdir -p logs
COPY package.json ./
COPY yarn.lock ./
RUN npm install yarn -g --registry=https://registry.npm.taobao.org
RUN yarn --verbose
COPY ./ ./
RUN rm -rf ./config/*

EXPOSE 8080

CMD NODE_ENV=production node --harmony index.js
