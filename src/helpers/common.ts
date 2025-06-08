import { status } from "@grpc/grpc-js";
import { ExceptionType, ResponseMessage } from "src/constants/common";

export const getKeyByValue = (obj: any, value: any) => {
  return Object.keys(obj).find((k) => obj[k] === value);
};

export const convertHttpExceptionToGrpc = (name: string): [number, string] => {
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
};
