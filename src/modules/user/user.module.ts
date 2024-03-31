import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { userProviders } from "./user.providers";
import { DatabaseModule } from "../database/database.module";
import { UniqueDatabaseColumn } from "../../validators/unique-database-column";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [UserController],
  providers: [...userProviders, UserService, UniqueDatabaseColumn],
})
export class UserModule {}
