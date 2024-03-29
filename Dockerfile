FROM node:14-alpine AS build

WORKDIR /usr/src/app

COPY ./taudinpurkauspeli/frontend .

RUN npm ci
RUN npm --max_old_space_size=4096 run build

FROM node:14-alpine

WORKDIR app/backend

COPY --from=build /usr/src/app/build /app/backend/build

COPY ./taudinpurkauspeli/backend .

RUN npm ci

EXPOSE 8080
EXPOSE 8081
EXPOSE 8082

CMD ["npm", "start"]
