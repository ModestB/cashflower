FROM node:12.16.1

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g nodemon

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]