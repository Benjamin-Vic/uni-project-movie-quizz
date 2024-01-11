FROM node:latest

COPY . /api-website
WORKDIR /api-website

RUN ls -lah
RUN npm install

ENTRYPOINT ["npm", "start"]