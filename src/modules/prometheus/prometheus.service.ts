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
  public readonly grpcRequestCounter: Counter;
  public readonly grpcRequestDuration: Histogram;
  public readonly serviceHealth: Gauge;

  constructor() {
    this.register = new Registry();

    collectDefaultMetrics({ register: this.register });

    this.grpcRequestCounter = new Counter({
      name: "grpc_requests_total",
      help: "Total number of gRPC requests",
      labelNames: ["method", "status"],
      registers: [this.register],
    });

    this.grpcRequestDuration = new Histogram({
      name: "grpc_request_duration_seconds",
      help: "Histogram of gRPC request durations in seconds.",
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
}
