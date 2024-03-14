# Use the official Nginx image as the base image
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d

# Set the working directory to Nginx's html directory
WORKDIR /usr/share/nginx/html

# Remove any existing files
RUN rm -rf ./*

# Copy the build artifacts from your local 'dist' directory to the container
COPY dist .

# Expose port 80
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]
