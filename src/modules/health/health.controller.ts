import { Controller, Inject, Logger, UseInterceptors } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { HealthCheckResponse } from "src/proto/types/grpc/health/v1/HealthCheckResponse";
import { HealthService } from "./health.service";
import { ServingStatus } from "src/proto/types/grpc/health/v1/ServingStatus";
import { getKeyByValue } from "src/helpers/common";
import { GrpcInterceptor } from "src/interceptors/grpc.interceptor";
import { PrometheusService } from "../prometheus/prometheus.service";
import { GrpcJaegerInterceptor } from "../../interceptors/grpc-jaeger.interceptor";

@Controller()
@UseInterceptors(GrpcInterceptor, GrpcJaegerInterceptor)
export class HealthController {
  private readonly logger = new Logger(HealthController.name, {
    timestamp: true,
  });

  constructor(
    @Inject(HealthService) private readonly healthService: HealthService,
    @Inject(PrometheusService)
    private readonly prometheusService: PrometheusService,
  ) {}

  @GrpcMethod("Health", "Check")
  async check(): Promise<HealthCheckResponse> {
    try {
      const status = await this.healthService.getServicesHealthStatus();

      this.logger.log(
        `Overall health status: "${getKeyByValue(ServingStatus, status)}"`,
      );

      if (status === ServingStatus.NOT_SERVING) {
        this.prometheusService.updateServiceHealthGuage(0);

        return { status };
      }

      this.prometheusService.updateServiceHealthGuage(1);

      return { status };
    } catch (err) {
      this.logger.error(
        `Error in ${HealthController.name}::${this.check.name}: "${err.message}"`,
      );

      throw new RpcException(err);
    }
  }
}
