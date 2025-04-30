FROM node:18

WORKDIR /app

# Copy only package.json files first for better caching
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Copy prisma schema first - this is crucial
COPY prisma/ ./prisma/

# Install OpenSSL (for Prisma)
RUN apt-get update && apt-get install -y openssl

# Install dependencies without running Prisma generate yet
RUN npm install --ignore-scripts

# Now copy everything else
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the client
RUN cd client && npm install && npm run build

# Install server dependencies
RUN cd server && npm install

# Expose port
EXPOSE 3001

# Create a startup script that will run migrations and start the server
RUN echo '#!/bin/bash\nnpx prisma migrate deploy\nnode server/index.js' > /app/start.sh
RUN chmod +x /app/start.sh

# Run the startup script
CMD ["/app/start.sh"]