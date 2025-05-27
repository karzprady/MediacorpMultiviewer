FROM node:alpine3.18 AS build

# Declare build time environment variables

ARG VITE_API

# Set default values for environment variables

ENV VITE_API=$VITE_API

# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]