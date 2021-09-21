FROM node:alpine as builder

RUN sudo apt-get update
RUN sudo apt-get install gem
RUN gem install bundler

WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html