import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Todo extends Model {
  @ForeignKey(() => User)
  owner: User;

  @Column
  title: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
