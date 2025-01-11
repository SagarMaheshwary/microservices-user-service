import { Controller, Inject, Logger } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { HealthCheckResponse } from "src/proto/types/grpc/health/v1/HealthCheckResponse";
import { HealthService } from "./health.service";
import { ServingStatus } from "src/proto/types/grpc/health/v1/ServingStatus";
import { getKeyByValue } from "src/helpers/common";

@Controller("health")
export class HealthController {
  private readonly logger = new Logger(HealthController.name, {
    timestamp: true,
  });

  constructor(
    @Inject(HealthService) private readonly healthService: HealthService,
  ) {}

  @GrpcMethod("Health", "Check")
  async check(): Promise<HealthCheckResponse> {
    try {
      const status = await this.healthService.getServicesHealthStatus();

      this.logger.log(
        `Overall health status: "${getKeyByValue(ServingStatus, status)}"`,
      );

      return {
        status,
      };
    } catch (err) {
      this.logger.error(
        `Error in ${HealthController.name}::${this.check.name}: "${err.message}"`,
      );

      throw new RpcException(err);
    }
  }
}
