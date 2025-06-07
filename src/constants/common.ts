export enum ResponseMessage {
  OK = "Success",
  CREATED = "Created New Resource",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  NOT_FOUND = "Resource Not Found",
  UNAUTHENTICATED = "Unauthenticated",
  UNAUTHORIZED = "Unauthorized",
  BAD_REQUEST = "Bad Request",
}

export enum ExceptionType {
  ENTITY_NOT_FOUND_ERROR = "EntityNotFoundError",
  NOT_FOUND_EXCEPTION = "NotFoundException",
  UNAUTHORIZED_EXCEPTION = "UnauthorizedException",
  FORBIDDEN_EXCEPTION = "ForbiddenException",
  BAD_REQUEST_EXCEPTION = "BadRequestException",
}

export const ServiceName = "User Service";
