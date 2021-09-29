FROM node:14

WORKDIR /taudinpurkauspeli/backend

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start