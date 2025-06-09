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

# gRPC healthchecker for docker compose
ADD https://github.com/grpc-ecosystem/grpc-health-probe/releases/latest/download/grpc_health_probe-linux-amd64 /bin/grpc-health-probe

RUN chmod +x /bin/grpc-health-probe

CMD [ "npm", "run", "start:dev" ]
