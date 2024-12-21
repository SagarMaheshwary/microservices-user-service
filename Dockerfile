FROM node:20 AS builder

WORKDIR /app

COPY ./package*.json .

RUN npm i

COPY . /app

RUN npm run build

# "alpine" seems to be causing issues with grpc so using "slim"
FROM node:20-slim AS production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY ./package*.json /app/

CMD [ "npm", "run", "start:prod" ]

# "alpine" seems to be causing issues with grpc so using "slim"
FROM node:20-slim AS development

WORKDIR /app

COPY --from=builder /app /app

CMD [ "npm", "run", "start:dev" ]
