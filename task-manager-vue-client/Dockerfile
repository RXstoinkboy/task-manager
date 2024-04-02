FROM node:20.11.1-alpine as build-stage

WORKDIR /usr/client

COPY package*.json ./

RUN npm install

# Copy the rest of the code to the working directory
COPY . .

RUN npm run build

# Production stage
FROM nginx:1.25.4-alpine as production-stage

# Copy built app to nginx server root directory
COPY --from=build-stage /usr/client/dist /usr/share/nginx/html

# Expose port 80 for the app to be accessible
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf  

# Start nginx
CMD ["nginx", "-g", "daemon off;"]