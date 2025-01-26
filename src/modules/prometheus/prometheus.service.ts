import { Injectable } from "@nestjs/common";
import {
  collectDefaultMetrics,
  Counter,
  Gauge,
  Histogram,
  Registry,
} from "prom-client";

@Injectable()
export class PrometheusService {
  private readonly register: Registry;
  private readonly grpcRequestCounter: Counter;
  private readonly grpcRequestLatency: Histogram;
  private readonly serviceHealth: Gauge;

  constructor() {
    this.register = new Registry();

    collectDefaultMetrics({ register: this.register });

    this.grpcRequestCounter = new Counter({
      name: "grpc_requests_total",
      help: "Total number of gRPC requests",
      labelNames: ["method", "status"],
      registers: [this.register],
    });

    this.grpcRequestLatency = new Histogram({
      name: "grpc_request_latency_seconds",
      help: "Latency of gRPC requests in seconds",
      labelNames: ["method"],
      registers: [this.register],
    });

    this.serviceHealth = new Gauge({
      name: "service_health_status",
      help: "Health status of the service: 1=Healthy, 0=Unhealthy",
      registers: [this.register],
    });
  }

  public async getMetrics(): Promise<string> {
    return this.register.metrics();
  }

  public incrementGRPCRequestCounter(serviceName: string, status: string) {
    this.grpcRequestCounter.labels(serviceName, status).inc();
  }

  public addGRPCRequestLatencyToHistogram(
    serviceName: string,
    duration: number,
  ) {
    this.grpcRequestLatency.labels(serviceName).observe(duration);
  }

  public updateServiceHealthGuage(status: number) {
    this.serviceHealth.set(status);
  }
}
