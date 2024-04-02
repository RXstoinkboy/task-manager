FROM node:20.11.1-alpine

# Set the working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
ENV PORT=5000
EXPOSE $PORT

# Start the application
CMD npm run start:prod