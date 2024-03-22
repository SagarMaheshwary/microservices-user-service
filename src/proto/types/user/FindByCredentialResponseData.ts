// Original file: src/proto/user.proto

import type {
  User as _user_User,
  User__Output as _user_User__Output,
} from "../user/User";

export interface FindByCredentialResponseData {
  user?: _user_User | null;
}

export interface FindByCredentialResponseData__Output {
  user?: _user_User__Output;
}
