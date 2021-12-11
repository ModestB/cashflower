FROM node:12.16.1

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies
# install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]