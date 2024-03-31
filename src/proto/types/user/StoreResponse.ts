// Original file: src/proto/user.proto

import type {
  StoreResponseData as _user_StoreResponseData,
  StoreResponseData__Output as _user_StoreResponseData__Output,
} from "../user/StoreResponseData";

export interface StoreResponse {
  message?: string;
  data?: _user_StoreResponseData | null;
}

export interface StoreResponse__Output {
  message?: string;
  data?: _user_StoreResponseData__Output;
}
