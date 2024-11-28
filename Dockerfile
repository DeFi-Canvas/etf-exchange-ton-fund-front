FROM node:20.18.1-bullseye-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

# RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]

# CMD [ "serve", "-s", "dist" ]
