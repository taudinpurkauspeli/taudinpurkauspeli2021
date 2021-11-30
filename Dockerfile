FROM node:13.12.0-alpine

WORKDIR /app/taudinpurkauspeli/backend
    
COPY .taudinpurkauspeli/backend .

CMD ["npm", "start"]