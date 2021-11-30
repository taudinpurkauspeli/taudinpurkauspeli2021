FROM node:16-alpine

WORKDIR /app/taudinpurkauspeli/backend

COPY . .

RUN npm install

EXPOSE 8081
EXPOSE 8082

CMD ["npm", "start"]
