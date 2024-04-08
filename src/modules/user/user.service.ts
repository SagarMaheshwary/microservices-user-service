import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { USER_REPOSITORY } from "../../constants/database";
import { StoreRequest } from "../../proto/types/user/StoreRequest";
import { Hash } from "../../lib/hash";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: Repository<User>,
    @Inject(Hash) private readonly hash: Hash,
  ) {}

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  public async findByCredential(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.findByEmail(email);

    if (!(await this.hash.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email });
  }

  public async store(user: StoreRequest): Promise<User> {
    const password = await this.hash.make(user.password);

    const newUser = await this.userRepository.save(
      {
        ...user,
        password,
      },
      { transaction: false },
    );

    return await this.findById(newUser.id);
  }
}
