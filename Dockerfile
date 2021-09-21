FROM node:alpine as builder

RUN apt-get update
RUN apt-get install gem -y && \
    gem install -y bundler

WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html