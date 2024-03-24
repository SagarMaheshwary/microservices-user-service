// Original file: src/proto/user.proto

import type {
  FindByIdResponseData as _user_FindByIdResponseData,
  FindByIdResponseData__Output as _user_FindByIdResponseData__Output,
} from "../user/FindByIdResponseData";

export interface FindByIdResponse {
  message?: string;
  data?: _user_FindByIdResponseData | null;
}

export interface FindByIdResponse__Output {
  message?: string;
  data?: _user_FindByIdResponseData__Output;
}
