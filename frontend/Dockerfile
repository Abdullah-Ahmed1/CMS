# Dockerfile for React client

# Build react client
FROM node:alpine

# Working directory be app
WORKDIR /frontend

COPY package*.json /frontend/

###  Installing dependencies

RUN npm install --force

# copy local files to app folder
COPY . /frontend/

EXPOSE 3000

CMD ["npm","run dev"]