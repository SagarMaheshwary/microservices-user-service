import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY } from '../../constants/database';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }
}
