import {
  Controller,
  Inject,
  Logger,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { FindByIdRequest } from "../../proto/types/user/FindByIdRequest";
import { FindByIdResponse } from "../../proto/types/user/FindByIdResponse";
import { ResponseMessage } from "../../constants/common";
import { RpcExceptionFilter } from "../../exception-filters/rpc-exception.filter";
import { FindByCredentialResponse } from "../../proto/types/user/FindByCredentialResponse";
import { instanceToPlain } from "class-transformer";
import { StoreResponse } from "../../proto/types/user/StoreResponse";
import { StoreRequestDTO } from "./dto/store-request.dto";
import { FindByCredentialRequestDTO } from "./dto/find-by-credential-request.dto";
import { transformErrors } from "../../helpers/validation";
import { GrpcInterceptor } from "src/interceptors/grpc.interceptor";

@Controller()
@UsePipes(
  new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    exceptionFactory(errors) {
      transformErrors(errors);
    },
  }),
)
@UseFilters(new RpcExceptionFilter())
@UseInterceptors(GrpcInterceptor)
export class UserController {
  private readonly logger = new Logger(UserController.name, {
    timestamp: true,
  });

  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @GrpcMethod("UserService", "FindById")
  async findById(data: FindByIdRequest): Promise<FindByIdResponse> {
    try {
      const user = await this.userService.findById(data.id);

      return {
        message: ResponseMessage.OK,
        data: {
          user: instanceToPlain(user),
        },
      };
    } catch (err) {
      this.logger.error(
        `Error in ${UserController.name}::${this.findById.name}: "${err.message}"`,
      );

      throw new RpcException(err);
    }
  }

  @GrpcMethod("UserService", "FindByCredential")
  async findByCredendial(
    data: FindByCredentialRequestDTO,
  ): Promise<FindByCredentialResponse> {
    try {
      const user = await this.userService.findByCredential(
        data.email,
        data.password,
      );

      return {
        message: ResponseMessage.OK,
        data: {
          user: instanceToPlain(user),
        },
      };
    } catch (err) {
      this.logger.error(
        `Error in ${UserController.name}::${this.findByCredendial.name}: "${err.message}"`,
      );

      throw new RpcException(err);
    }
  }

  @GrpcMethod("UserService", "Store")
  async store(data: StoreRequestDTO): Promise<StoreResponse> {
    try {
      const user = await this.userService.store(data);

      return {
        message: ResponseMessage.CREATED,
        data: {
          user: instanceToPlain(user),
        },
      };
    } catch (err) {
      this.logger.error(
        `Error in ${UserController.name}::${this.store.name}: "${err.message}"`,
      );

      throw new RpcException(err);
    }
  }
}
