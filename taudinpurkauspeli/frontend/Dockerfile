FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/taudinpurkauspeli/frontend

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]