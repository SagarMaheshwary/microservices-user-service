import { getEnv } from '../helpers/common';

export default () => ({
  grpc: {
    host: getEnv('GRPC_HOST'),
    port: parseInt(getEnv('GRPC_PORT')),
  },
  database: {
    host: getEnv('DB_HOST'),
    database: getEnv('DB_DATABASE'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    port: parseInt(getEnv('DB_PORT')),
    logging: parseInt(getEnv('DB_LOGGING')),
  },
});
