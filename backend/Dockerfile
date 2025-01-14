# Use a lightweight Node.js image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN apk add --no-cache --virtual .gyp python3 make g++ postgresql-dev

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

ARG DATABASE_URL

ENV DATABASE_URL = ${DATABASE_URL}

# Generate Prisma client
RUN npx prisma generate


RUN npm run build


# Expose the backend port
EXPOSE 3000

# Start the server
CMD ["sh", "-c", "[ ! -f /app/.migrated ] && npx prisma migrate deploy && touch /app/.migrated; npm start"]
