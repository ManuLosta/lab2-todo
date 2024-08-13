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

  private async findUserById(userId: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id: userId },
      include: [{ model: this.todoModel }],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(userId: number, title: string) {
    const user = await this.findUserById(userId);
    const newTodo = await this.todoModel.create({
      title,
      owner: user.id,
    });

    return newTodo;
  }

  async findAllbyUserId(userId: number) {
    const user = await this.findUserById(userId);
    return user.todos;
  }

  async editTodo(userId: number, todo: EditTodoDto) {
    await this.findUserById(userId);
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

  async toggleCompletion(userId: number, todoId: number) {
    const user = await this.findUserById(userId);
    const todo = user.todos.find((todo) => todo.id === todoId);

    if (!todo) throw new NotFoundException('Todo not found');

    const newCompletionStatus = !todo.completed;

    return this.todoModel.update(
      {
        completed: newCompletionStatus,
      },
      {
        where: {
          id: todoId,
        },
      },
    );
  }
}
