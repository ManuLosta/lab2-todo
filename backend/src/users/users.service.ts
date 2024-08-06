import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    await user.destroy();
  }

  async create(username: string, password: string): Promise<void> {
    await this.userModel.create({
      username,
      password,
    });
  }
}
