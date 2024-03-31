import { IsDefined, IsEmail, Length, Validate } from "class-validator";
import { StoreRequest } from "../../../proto/types/user/StoreRequest";
import { UniqueDatabaseColumn } from "../../../validators/unique-database-column";
import { User } from "../user.entity";

export class StoreRequestDTO implements StoreRequest {
  @IsDefined()
  @Length(3, 50)
  name: string;

  @IsDefined()
  @IsEmail()
  @Length(5, 255)
  @Validate(UniqueDatabaseColumn, [User, "email"])
  email: string;

  @IsDefined()
  @Length(5, 255)
  password: string;
}
