FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 8080

CMD [ "node", "./build/src/app.js" ]