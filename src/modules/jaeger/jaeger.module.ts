import { Module, OnModuleInit, Global, Inject, Logger } from "@nestjs/common";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ServiceName } from "src/constants/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
  imports: [ConfigModule],
})
export class JaegerModule implements OnModuleInit {
  private readonly logger = new Logger(JaegerModule.name, {
    timestamp: true,
  });

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const jaegerUrl = this.configService.get("jaeger.url");

    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: `http://${jaegerUrl}/v1/traces`,
      }),
      instrumentations: getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-grpc": { enabled: true },
      }),
      serviceName: ServiceName,
    });

    sdk.start();

    this.logger.log("Initialized Jaeger Tracing");
  }
}
