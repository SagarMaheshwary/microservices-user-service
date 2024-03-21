import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: "user",
      protoPath: join(__dirname, "proto/user.proto"),
      url: `${configService.get("grpc.host")}:${configService.get(
        "grpc.port",
      )}`,
      loader: {
        keepCase: true,
      },
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
