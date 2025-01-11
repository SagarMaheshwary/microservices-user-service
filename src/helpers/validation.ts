import { RpcException } from "@nestjs/microservices";
import { ValidationError } from "class-validator";
import { ExceptionType } from "../constants/common";

export const transformErrors = (errors: ValidationError[]) => {
  const _errors = {};

  Object.keys(errors[0].target).forEach((key) => (_errors[key] = []));

  errors.forEach((error) => {
    _errors[error.property] = Object.values(error.constraints);
  });

  throw new RpcException({
    errors: _errors,
    name: ExceptionType.BAD_REQUEST_EXCEPTION,
  });
};
