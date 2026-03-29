FROM node:20-alpine AS builder

WORKDIR /app

COPY apps/web/package*.json ./
RUN npm install

COPY apps/web .
RUN npm run build

FROM nginx:1.17.8-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/default.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]