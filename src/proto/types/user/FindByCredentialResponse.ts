// Original file: src/proto/user.proto

import type { FindByCredentialResponseData as _user_FindByCredentialResponseData, FindByCredentialResponseData__Output as _user_FindByCredentialResponseData__Output } from '../user/FindByCredentialResponseData';

export interface FindByCredentialResponse {
  'message'?: (string);
  'data'?: (_user_FindByCredentialResponseData | null);
}

export interface FindByCredentialResponse__Output {
  'message'?: (string);
  'data'?: (_user_FindByCredentialResponseData__Output);
}
