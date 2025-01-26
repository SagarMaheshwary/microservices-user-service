import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  const configService = app.get<ConfigService>(ConfigService);

  const metricsHost = configService.get("prometheus.metricsHost");
  const metricsPort = configService.get("prometheus.metricsPort");

  await app.listen(metricsPort, metricsHost);

  const grpcHost = configService.get("grpc.host");
  const grpcPort = configService.get("grpc.port");

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ["user", "grpc.health.v1"],
      protoPath: [
        join(__dirname, "proto/user.proto"),
        join(__dirname, "proto/health.proto"),
      ],
      url: `${grpcHost}:${grpcPort}`,
      loader: {
        keepCase: true,
      },
    },
  });

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.startAllMicroservices();
}

bootstrap();
