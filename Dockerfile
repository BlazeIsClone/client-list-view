FROM node:17.8.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]