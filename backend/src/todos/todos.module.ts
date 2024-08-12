import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { User } from 'src/users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Todo, User])],
  controllers: [TodosController],
  providers: [TodosService, UsersService],
})
export class TodosModule {}
