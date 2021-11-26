FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY .taudinpurkauspeli/frontend .

RUN npm run build

FROM node:13.12.0-alpine

WORKDIR /app/taudinpurkauspeli/backend

COPY --from=build /usr/src/app/taudinpurkauspeli/frontend/build /app/taudinpurkauspeli/backend/build
    
COPY ./backend .

CMD ["npm", "start"]