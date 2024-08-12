import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create() {}

  async findAllbyUserId(userId: number) {
    const user: User = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user.todos;
  }
}
