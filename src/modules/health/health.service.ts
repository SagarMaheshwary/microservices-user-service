import { Inject, Injectable, Logger } from "@nestjs/common";
import { DATA_SOURCE } from "src/constants/database";
import { ServingStatus } from "src/proto/types/grpc/health/v1/ServingStatus";
import { DataSource } from "typeorm";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name, { timestamp: true });

  constructor(@Inject(DATA_SOURCE) private readonly db: DataSource) {}

  async getServicesHealthStatus(): Promise<ServingStatus> {
    if (!(await this.checkDatabase())) {
      return ServingStatus.NOT_SERVING;
    }

    return ServingStatus.SERVING;
  }

  async checkDatabase(): Promise<boolean> {
    try {
      await this.db.manager.query("SELECT 1");

      return true;
    } catch (err) {
      this.logger.error(`DB health check failed!: "${err.message}"`);

      return false;
    }
  }
}
