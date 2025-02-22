# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code (transpile to JavaScript)
RUN npm run build

# Expose the port the backend will run on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]