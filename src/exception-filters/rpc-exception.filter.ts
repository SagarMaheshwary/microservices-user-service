import { status } from "@grpc/grpc-js";
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ExceptionType, ResponseMessage } from "../constants/common";
import { throwError } from "rxjs";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const [code, message] = this.mapExceptionFields(error.name);

    return throwError(() => ({ code, message }));
  }

  private mapExceptionFields(name: string) {
    switch (name) {
      case ExceptionType.ENTITY_NOT_FOUND_ERROR:
      case ExceptionType.NOT_FOUND_EXCEPTION:
        return [status.NOT_FOUND, ResponseMessage.NOT_FOUND];
      case ExceptionType.UNAUTHORIZED_EXCEPTION:
        return [status.UNAUTHENTICATED, ResponseMessage.UNAUTHENTICATED];
      case ExceptionType.FORBIDDEN_EXCEPTION:
        return [status.PERMISSION_DENIED, ResponseMessage.UNAUTHORIZED];
      default:
        return [status.INTERNAL, ResponseMessage.INTERNAL_SERVER_ERROR];
    }
  }
}
