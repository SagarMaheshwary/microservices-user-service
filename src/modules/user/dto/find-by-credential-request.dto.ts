import { IsDefined, IsEmail, Length } from "class-validator";
import { FindByCredentialRequest } from "../../../proto/types/user/FindByCredentialRequest";

export class FindByCredentialRequestDTO implements FindByCredentialRequest {
  @IsDefined()
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsDefined()
  @Length(5, 255)
  password: string;
}
