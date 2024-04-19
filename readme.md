# MICROSERVICES - USER SERVICE

This service is a part of the Microservices project built for handling "user" related operations.

### TECHNOLOGIES

- NestJS (9.0)
- gRPC
- PostgreSQL (14)
- TypeORM (0.3.20)

### SETUP

cd into the cloned project directory and install dependencies:

```bash
npm install
```

Copy **.env.example** to **.env** and update the required variables.

Create tables with TypeORM migrations: (migrations config is defined in **src/config/migrations.typeorm.ts**)

```bash
npm run migration:run
```

Below command can be used to revert the migrations:

```bash
npm run migration:revert
```

Create build:

```bash
npm run build
```

Start the server for listening to incoming requests:

```bash
npm run start:prod
```

Or run in development mode:

```bash
npm run start:dev
```

### APIs (RPC)

Proto files are stored in **src/proto** directory.

| SERVICE     | RPC              | DESCRIPTION                                                                                                                                  |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| UserService | Store            | Create user, used by [authentication service](https://github.com/SagarMaheshwary/microservices-authentication-service) for user registration |
| UserService | FindById         | Find user by id, used by authentication service                                                                                              |
| UserService | FindByCredential | Find user by email and verify the given password, used by authentication service for user login                                              |
