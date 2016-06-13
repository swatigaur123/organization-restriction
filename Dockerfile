FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/organization-restriction-microservice
WORKDIR /usr/src/organization-restriction-microservice

# Install app dependencies
COPY package.json /usr/src/organization-restriction-microservice
RUN npm install

# Bundle app source
COPY . /usr/src/organization-restriction-microservice

CMD [ "npm", "start" ]
		
