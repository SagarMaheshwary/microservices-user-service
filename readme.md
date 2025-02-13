# MICROSERVICES - USER SERVICE

This service is a part of the Microservices project built for handling "user" related operations.

### TECHNOLOGIES

- NestJS (Typescript)
- gRPC – Serves as the main server for inter-service communication
- PostgreSQL – Stores user data
- TypeORM – ORM (Object-Relational Mapper) for PostgreSQL
- Prometheus Client – Exports default and custom metrics for Prometheus server monitoring

### SETUP

Follow the instructions in the [README](https://github.com/SagarMaheshwary/microservices?tab=readme-ov-file#setup) of the main microservices repository to run this service along with others using Docker Compose.

### APIs (gRPC)

Proto files are located in the **src/proto** directory.

| SERVICE     | RPC              | DESCRIPTION                                                                                                                 |
| ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| UserService | Store            | Create user                                                                                                                 |
| UserService | FindById         | Find user by id                                                                                                             |
| UserService | FindByCredential | Find user by email and verify the given password, used by authentication service for user login                             |
| Health      | Check            | Custom service health check implementation, similar to [grpc-golang](https://google.golang.org/grpc/health/grpc_health_v1). |

### APIs (REST)

| API      | METHOD | BODY | Headers | Description                 |
| -------- | ------ | ---- | ------- | --------------------------- |
| /metrics | GET    | -    | -       | Prometheus metrics endpoint |
