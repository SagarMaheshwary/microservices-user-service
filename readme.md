# MICROSERVICES - USER SERVICE

This service is a part of the Microservices project built for handling "user" related operations.

### TECHNOLOGIES

- NestJS
- gRPC
- PostgreSQL
- TypeORM

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

You can also revert the migrations with **migration:revert**

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

| SERVICE     | RPC              | DESCRIPTION                                      | USECASE                                                |
| ----------- | ---------------- | ------------------------------------------------ | ------------------------------------------------------ |
| UserService | Store            | Create user                                      | Used by authentication service for user registration   |
| UserService | FindById         | Find user by id                                  | Common RPC (Currently used by authentication service ) |
| UserService | FindByCredential | Find user by email and verify the given password | Used by authentication service for user login          |
