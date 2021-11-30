FROM node:13.12.0-alpine

WORKDIR /app/taudinpurkauspeli/backend
    
COPY . .

CMD ["npm", "install"]

CMD ["npm", "start"]
