import { getEnv } from "../helpers/common";

export default () => ({
  grpc: {
    host: <string>getEnv("GRPC_HOST"),
    port: parseInt(getEnv("GRPC_PORT")),
  },
  database: {
    host: <string>getEnv("DB_HOST"),
    database: <string>getEnv("DB_DATABASE"),
    username: <string>getEnv("DB_USERNAME"),
    password: <string>getEnv("DB_PASSWORD"),
    port: parseInt(getEnv("DB_PORT")),
    logging: parseInt(getEnv("DB_LOGGING")),
  },
  hash: {
    rounds: getEnv("HASH_ROUNDS", 10),
  },
});
