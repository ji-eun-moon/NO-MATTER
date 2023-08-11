FROM node:16 as builder

RUN mkdir ./app
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build


#nginx
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
