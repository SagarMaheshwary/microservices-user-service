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
  prometheus: {
    host: <string>getEnv("PROMETHEUS_HOST", "localhost"),
    port: parseInt(getEnv("PROMETHEUS_PORT", 5010)),
  },
  jaeger: {
    url: <string>getEnv("JAEGER_URL", "localhost:4318"),
  },
});

const getEnv = (key: string, defaultVal: any = null) => {
  return process.env[key] || defaultVal;
};
