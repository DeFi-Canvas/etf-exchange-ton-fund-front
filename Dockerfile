# syntax=docker/dockerfile:1

FROM node:20.18.1-bullseye-slim

WORKDIR /app

# ARG VITE_DOMAIN_API_URL
# ENV VITE_DOMAIN_API_URL=$VITE_DOMAIN_API_URL

COPY package.json .
# COPY package-lock.json .

RUN npm i

# RUN npm i -g serve

COPY . .

RUN npm run build

# EXPOSE 3000

CMD ["npm", "run", "start"]

# CMD ["serve", "-s", "dist"]

