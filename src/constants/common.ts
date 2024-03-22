export enum ResponseMessage {
  OK = "Success",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  NOT_FOUND = "Resource Not Found",
  UNAUTHENTICATED = "Unauthenticated",
  UNAUTHORIZED = "Unauthorized",
}

export enum ExceptionType {
  ENTITY_NOT_FOUND_ERROR = "EntityNotFoundError",
  NOT_FOUND_EXCEPTION = "NotFoundException",
  UNAUTHORIZED_EXCEPTION = "UnauthorizedException",
  FORBIDDEN_EXCEPTION = "ForbiddenException",
}
