import { status } from "@grpc/grpc-js";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ExceptionType, ResponseMessage } from "../constants/common";
import { throwError } from "rxjs";

@Catch(RpcException, HttpException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException | HttpException, host: ArgumentsHost) {
    let exceptionName = null;
    let exceptionData = null;

    if (exception instanceof RpcException) {
      exceptionName = (exception.getError() as any).name;
    } else {
      exceptionName = exception.name;
      exceptionData = (exception.getResponse() as any).message;
    }

    const [code, message] = this.mapExceptionFields(exceptionName);

    return throwError(() => ({
      code,
      message,
      details: Array.isArray(exceptionData)
        ? exceptionData.join("|")
        : exceptionData,
    }));
  }

  private mapExceptionFields(name: string): [number, string] {
    switch (name) {
      case ExceptionType.BAD_REQUEST_EXCEPTION:
        return [status.INVALID_ARGUMENT, ResponseMessage.BAD_REQUEST];
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
