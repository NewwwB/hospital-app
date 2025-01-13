# Use a lightweight Node.js image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Apply Prisma migrations
#RUN npx prisma migrate deploy


# Expose the backend port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
