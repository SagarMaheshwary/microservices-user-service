import { Metadata, ServerUnaryCall, status } from "@grpc/grpc-js";
import { Controller, Inject, Logger } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { FindByIdRequest } from "../../proto/types/user/FindByIdRequest";
import { FindByIdResponse } from "../../proto/types/user/FindByIdResponse";
import { ResponseMessage } from "../../constants/common";
import { FindByCredentialRequest } from "../../proto/types/user/FindByCredentialRequest";

@Controller()
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

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
          user,
        },
      };
    } catch (err) {
      let code = status.INTERNAL;
      let message = ResponseMessage.INTERNAL_SERVER_ERROR;

      if (err.name == "EntityNotFoundError") {
        code = status.NOT_FOUND;
        message = ResponseMessage.NOT_FOUND;
      }

      throw new RpcException({
        code,
        message,
      });
    }
  }

  @GrpcMethod("UserService", "FindByCredential")
  async findByCredendial(
    data: FindByCredentialRequest,
    metadata: Metadata,
    call: ServerUnaryCall<FindByCredentialRequest, FindByIdResponse>,
  ) {
    //
  }
}
