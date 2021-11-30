FROM node:16-alpine AS build

WORKDIR /usr/src/app/taudinpurkauspeli

COPY ./frontend .

RUN npm install
RUN npm run build

FROM node:16-alpine

WORKDIR /app/taudinpurkauspeli/backend

COPY --from=build /usr/src/app/build /app/taudinpurkauspeli/backend/build

COPY ./backend .

RUN npm install

EXPOSE 8080
EXPOSE 8081
EXPOSE 8082

CMD ["npm", "start"]
