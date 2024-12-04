FROM node:latest as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/node_modules/.bin:$PATH

ARG VITE_DOMAIN_API_URL
ENV VITE_DOMAIN_API_URL=$VITE_DOMAIN_API_URL

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:latest as prod

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
