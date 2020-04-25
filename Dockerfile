FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install && mv node_modules ../
COPY . .
EXPOSE 8069
CMD yarn run start