import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller, Inject, Logger, UseFilters } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { FindByIdRequest } from "../../proto/types/user/FindByIdRequest";
import { FindByIdResponse } from "../../proto/types/user/FindByIdResponse";
import { ResponseMessage } from "../../constants/common";
import { FindByCredentialRequest } from "../../proto/types/user/FindByCredentialRequest";
import { RpcExceptionFilter } from "../../exception-filters/rpc-exception.filter";
import { FindByCredentialResponse } from "../../proto/types/user/FindByCredentialResponse";
import { instanceToPlain } from "class-transformer";

@Controller()
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @UseFilters(new RpcExceptionFilter())
  @GrpcMethod("UserService", "FindById")
  async findById(
    data: FindByIdRequest,
    metadata: Metadata,
    call: ServerUnaryCall<FindByIdRequest, FindByIdResponse>,
  ): Promise<FindByIdResponse> {
    try {
      const user = await this.userService.findById(data.id);

      return {
        message: ResponseMessage.OK,
        data: {
          user: instanceToPlain(user),
        },
      };
    } catch (err) {
      Logger.error(err);
      throw new RpcException(err);
    }
  }

  @UseFilters(new RpcExceptionFilter())
  @GrpcMethod("UserService", "FindByCredential")
  async findByCredendial(
    data: FindByCredentialRequest,
    metadata: Metadata,
    call: ServerUnaryCall<FindByCredentialRequest, FindByCredentialResponse>,
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
      Logger.error(err);
      throw new RpcException(err);
    }
  }
}
