# Use an official Node.js runtime as a parent image
FROM node:20.6.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application's dependencies
RUN npm install 

# Copy the rest of the application source code
COPY . .

# Expose the port that the application will run on
EXPOSE 3001

# Define the command to start your Node.js application
CMD node dist/server.js