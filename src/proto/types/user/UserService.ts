// Original file: src/proto/user.proto

import type * as grpc from "@grpc/grpc-js";
import type { MethodDefinition } from "@grpc/proto-loader";
import type {
  FindByCredentialRequest as _user_FindByCredentialRequest,
  FindByCredentialRequest__Output as _user_FindByCredentialRequest__Output,
} from "../user/FindByCredentialRequest";
import type {
  FindByCredentialResponse as _user_FindByCredentialResponse,
  FindByCredentialResponse__Output as _user_FindByCredentialResponse__Output,
} from "../user/FindByCredentialResponse";
import type {
  FindByIdRequest as _user_FindByIdRequest,
  FindByIdRequest__Output as _user_FindByIdRequest__Output,
} from "../user/FindByIdRequest";
import type {
  FindByIdResponse as _user_FindByIdResponse,
  FindByIdResponse__Output as _user_FindByIdResponse__Output,
} from "../user/FindByIdResponse";
import type {
  StoreRequest as _user_StoreRequest,
  StoreRequest__Output as _user_StoreRequest__Output,
} from "../user/StoreRequest";
import type {
  StoreResponse as _user_StoreResponse,
  StoreResponse__Output as _user_StoreResponse__Output,
} from "../user/StoreResponse";

export interface UserServiceClient extends grpc.Client {
  FindByCredential(
    argument: _user_FindByCredentialRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  FindByCredential(
    argument: _user_FindByCredentialRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  FindByCredential(
    argument: _user_FindByCredentialRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  FindByCredential(
    argument: _user_FindByCredentialRequest,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  findByCredential(
    argument: _user_FindByCredentialRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  findByCredential(
    argument: _user_FindByCredentialRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  findByCredential(
    argument: _user_FindByCredentialRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;
  findByCredential(
    argument: _user_FindByCredentialRequest,
    callback: grpc.requestCallback<_user_FindByCredentialResponse__Output>,
  ): grpc.ClientUnaryCall;

  FindById(
    argument: _user_FindByIdRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  FindById(
    argument: _user_FindByIdRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  FindById(
    argument: _user_FindByIdRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  FindById(
    argument: _user_FindByIdRequest,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  findById(
    argument: _user_FindByIdRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  findById(
    argument: _user_FindByIdRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  findById(
    argument: _user_FindByIdRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;
  findById(
    argument: _user_FindByIdRequest,
    callback: grpc.requestCallback<_user_FindByIdResponse__Output>,
  ): grpc.ClientUnaryCall;

  Store(
    argument: _user_StoreRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  Store(
    argument: _user_StoreRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  Store(
    argument: _user_StoreRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  Store(
    argument: _user_StoreRequest,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  store(
    argument: _user_StoreRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  store(
    argument: _user_StoreRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  store(
    argument: _user_StoreRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
  store(
    argument: _user_StoreRequest,
    callback: grpc.requestCallback<_user_StoreResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  FindByCredential: grpc.handleUnaryCall<
    _user_FindByCredentialRequest__Output,
    _user_FindByCredentialResponse
  >;

  FindById: grpc.handleUnaryCall<
    _user_FindByIdRequest__Output,
    _user_FindByIdResponse
  >;

  Store: grpc.handleUnaryCall<_user_StoreRequest__Output, _user_StoreResponse>;
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  FindByCredential: MethodDefinition<
    _user_FindByCredentialRequest,
    _user_FindByCredentialResponse,
    _user_FindByCredentialRequest__Output,
    _user_FindByCredentialResponse__Output
  >;
  FindById: MethodDefinition<
    _user_FindByIdRequest,
    _user_FindByIdResponse,
    _user_FindByIdRequest__Output,
    _user_FindByIdResponse__Output
  >;
  Store: MethodDefinition<
    _user_StoreRequest,
    _user_StoreResponse,
    _user_StoreRequest__Output,
    _user_StoreResponse__Output
  >;
}
