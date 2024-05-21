
# official Node.js image as the base image
FROM node:20.10.0-alpine

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

# to run the dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8001

CMD ["npm", "run", "start:prod"]
