import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Todo } from 'src/todos/todo.model';

@Table
export class User extends Model {
  @Column({
    unique: true,
  })
  username: string;

  @Column
  password: string;

  @HasMany(() => Todo)
  todos: Todo[];
}
