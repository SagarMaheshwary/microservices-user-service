import { Controller, Get, Header, Inject } from "@nestjs/common";
import { PrometheusService } from "./prometheus.service";

@Controller()
export class PrometheusController {
  constructor(
    @Inject(PrometheusService)
    private readonly prometheusService: PrometheusService,
  ) {}

  @Get("/metrics")
  @Header("Content-Type", "text/plain; version=0.0.4")
  getMetrics(): Promise<string> {
    return this.prometheusService.getMetrics();
  }
}
