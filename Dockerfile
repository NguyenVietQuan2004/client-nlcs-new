# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
