FROM node:14

WORKDIR /taudinpurkauspeli/backend

COPY package*.json /taudinpurkauspeli/backend

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start