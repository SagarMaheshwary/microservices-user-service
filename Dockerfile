FROM node:20

WORKDIR /app

COPY ./package*.json .

RUN npm i

COPY . /app

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
