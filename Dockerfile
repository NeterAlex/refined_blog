FROM node:lts-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install --production

COPY . .

EXPOSE 8080

CMD [ "pnpm", "run", "start" ]