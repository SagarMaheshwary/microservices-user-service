import { DataSource } from "typeorm";
import { config as configEnv } from "dotenv";
import appConfig from ".";
import { CreateUsersTable1710958206638 } from "../database/migrations/1710958206638-create-users-table";
import { POSTGRES } from "../constants/database";

/**
 * CONFIG FILE USED WHEN RUNNING THE MIGRATIONS
 * ------------------------------------------------------------------------
 *
 * Create migration:
 * npm migration:create src/database/migrations/migration-file-name
 *
 * Run/revert migrations:
 * npm run migration:run
 * npm run migration:revert
 */

configEnv();
const config = appConfig();

export default new DataSource({
  type: POSTGRES,
  host: config.database.host,
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
  port: config.database.port,
  logging: Boolean(config.database.logging),
  migrations: [CreateUsersTable1710958206638],
});
