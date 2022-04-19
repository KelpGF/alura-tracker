FROM node:16.14.2-alpine as node-packages
WORKDIR /packages
COPY package*.json ./
RUN npm install

FROM node:16.14.2-alpine 
WORKDIR /app-tracker
COPY --from=node-packages /packages/node_modules /app-tracker/node_modules
COPY . .
EXPOSE 8080