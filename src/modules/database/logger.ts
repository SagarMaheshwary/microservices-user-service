import { AbstractLogger, LogLevel, LogMessage, QueryRunner } from "typeorm";
import { Logger as NestLogger } from "@nestjs/common";

export class Logger extends AbstractLogger {
  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    });

    const logger = new NestLogger("TypeORM");

    for (let message of messages) {
      switch (message.type ?? level) {
        case "log":
        case "schema-build":
        case "migration":
          logger.log(message.message);
          break;

        case "info":
        case "query":
          if (message.prefix) {
            logger.log(
              `${message.prefix.toLocaleUpperCase()} ${message.message}`,
            );
          } else {
            logger.log(message.message);
          }
          break;

        case "warn":
        case "query-slow":
          if (message.prefix) {
            logger.warn(
              `${message.prefix.toLocaleUpperCase()} ${message.message}`,
            );
          } else {
            logger.warn(message.message);
          }
          break;

        case "error":
        case "query-error":
          if (message.prefix) {
            logger.error(
              `${message.prefix.toLocaleUpperCase()} ${message.message}`,
            );
          } else {
            logger.error(message.message);
          }
          break;
      }
    }
  }
}
