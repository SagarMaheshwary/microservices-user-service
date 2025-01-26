import { Controller, Get, Inject } from "@nestjs/common";
import { PrometheusService } from "./prometheus.service";

@Controller()
export class PrometheusController {
  constructor(
    @Inject(PrometheusService)
    private readonly prometheusService: PrometheusService,
  ) {}

  @Get("/metrics")
  getMetrics(): Promise<string> {
    return this.prometheusService.getMetrics();
  }
}
