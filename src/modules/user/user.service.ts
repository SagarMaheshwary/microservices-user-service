import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { USER_REPOSITORY } from "../../constants/database";
import { compare, hash } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  public async findByCredential(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.findByEmail(email);

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email });
  }
}
