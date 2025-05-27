# Stage 1: Build with Vite
FROM node:18-alpine AS build

# Accept VITE_API as a build-time argument
ARG VITE_API
ENV VITE_API=$VITE_API

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Copy custom nginx config (handles React Router fallback)
COPY multiviewer/nginx.conf /etc/nginx/conf.d/default.conf

# Clean default static files and add new ones
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
