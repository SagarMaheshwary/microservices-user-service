import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { DatabaseModule } from "./modules/database/database.module";
import { UserModule } from "./modules/user/user.module";
import { HealthModule } from "./modules/health/health.module";
import { PrometheusModule } from "./modules/prometheus/prometheus.module";
import { existsSync } from "fs";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      ignoreEnvFile: !existsSync(join(__dirname, "..", ".env")),
    }),
    DatabaseModule,
    UserModule,
    HealthModule,
    PrometheusModule,
  ],
})
export class AppModule {}
