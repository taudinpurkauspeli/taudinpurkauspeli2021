FROM node:16-alpine

WORKDIR usr/src/app/taudinpurkauspeli/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081
EXPOSE 8082

CMD ["npm", "start"]
