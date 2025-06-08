import { ExceptionFilter, Catch, ArgumentsHost, Logger } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { throwError } from "rxjs";
import { convertHttpExceptionToGrpc } from "src/helpers/common";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as any;

    const exceptionName = error.name;
    const exceptionData = error.errors ? JSON.stringify(error.errors) : null;

    const [code, message] = convertHttpExceptionToGrpc(exceptionName);

    Logger.error(
      `Exception: "${exceptionName}" Status: "${code}" Message: "${message}"`,
    );

    return throwError(() => ({
      code,
      message,
      details: exceptionData,
    }));
  }
}
