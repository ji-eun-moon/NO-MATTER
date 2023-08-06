FROM node:14 as builder

RUN mkdir ./app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


#nginx
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
