# Use the official Node.js base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the React app (assuming you have a build script defined in package.json)
RUN npm run build

# Set the command to start the app when the container starts
CMD ["npm", "start"]
