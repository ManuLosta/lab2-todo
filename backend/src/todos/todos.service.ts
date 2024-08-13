import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { EditTodoDto } from './dto/edit-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(userId: number, title: string) {
    const user: User = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const newTodo = await this.todoModel.create({
      title,
      owner: user.id,
    });

    return newTodo;
  }

  async findAllbyUserId(userId: number) {
    const user: User = await this.userModel.findOne({
      where: {
        id: userId,
      },
      include: [{ model: this.todoModel }],
    });

    if (!user) throw new NotFoundException('User not found');

    return user.todos;
  }

  async editTodo(userId: number, todo: EditTodoDto) {
    const user: User = await this.userModel.findOne({
      where: {
        id: userId,
      },
      include: [{ model: this.todoModel }],
    });

    if (!user) throw new NotFoundException('User not found');

    return this.todoModel.update(
      {
        title: todo.title,
        completed: todo.completed,
      },
      {
        where: {
          id: todo.id,
        },
      },
    );
  }
}
