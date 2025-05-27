FROM node:alpine3.18 AS build

ARG VITE_API
ENV VITE_API=$VITE_API

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy nginx.conf into /app to make it accessible in next stage
COPY nginx.conf /app/nginx.conf

FROM nginx:alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
