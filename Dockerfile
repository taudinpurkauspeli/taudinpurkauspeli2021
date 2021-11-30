FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY ./taudinpurkauspeli/frontend .

RUN npm install
RUN npm run build export NODE_OPTIONS="--max-old-space-size=5120"

FROM node:16-alpine

WORKDIR app/backend

COPY --from=build /usr/src/app/build /app/backend/build

COPY ./taudinpurkauspeli/backend .

RUN npm install

EXPOSE 8080
EXPOSE 8081
EXPOSE 8082

CMD ["npm", "start"]
