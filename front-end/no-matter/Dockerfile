# Use the official Node.js base image
FROM node:14

# Nginx 이미지를 기반으로 합니다.
FROM nginx:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Nginx 설정 파일을 덮어씁니다.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Install dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the React app (assuming you have a build script defined in package.json)
RUN npm run build
# React 앱의 빌드 파일들을 Nginx 웹 루트로 복사합니다.
COPY build /S09P12C105/front-end/no-matter/nginx/html;

# Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
