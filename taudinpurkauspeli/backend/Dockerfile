FROM alpine:3.11

ENV NODE_VERSION 16.10.0

WORKDIR /taudinpurkauspeli/backend

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start