FROM node:carbon
RUN mkdir -p workspace
WORKDIR workspace
RUN mkdir -p logs
COPY package.json ./
COPY yarn.lock ./
RUN npm install yarn -g --registry=https://registry.npm.taobao.org
RUN echo '@bee:registry=https://npm.117sport.com' >> /root/.npmrc
RUN echo '//npm.117sport.com/:_authToken="nTfGjd/u5+UfsNJIpclsEw=="' >> /root/.npmrc
RUN yarn --verbose
COPY ./ ./
RUN rm -rf ./config/*
COPY ./config/config.base.js ./config/config.base.js

EXPOSE 8080

CMD node index.js
