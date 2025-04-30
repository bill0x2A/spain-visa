# Create a file named Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json files first for better caching
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the client
RUN npm run build

# Expose the port your app will run on
EXPOSE 3001

# Start the application
CMD npm start