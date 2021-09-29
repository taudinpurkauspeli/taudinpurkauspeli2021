FROM node:16

WORKDIR /taudinpurkauspeli/backend

COPY ./package*.json /-/tree/main/taudinpurkauspeli/backend

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start