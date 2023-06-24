# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the entire directory into the container at /app
COPY . /app

# Run npm install to install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start the application with npm start
CMD ["npm", "start"]
