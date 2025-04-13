FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy source files
COPY . .
COPY client ./client

# Build the React app
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 