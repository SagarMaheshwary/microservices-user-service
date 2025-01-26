import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import { PrometheusModule } from "../prometheus/prometheus.module";

@Module({
  imports: [DatabaseModule, PrometheusModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
