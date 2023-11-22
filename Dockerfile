# Use Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy the entire Next.js application to the container
COPY . .

# Build the Next.js application
RUN yarn build --debug

# Expose the port used by your Next.js app
EXPOSE 3001

# Command to run your Next.js app when the container starts
CMD ["yarn", "start"]