import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'example',
      database: 'todo',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Todo],
    }),
    AuthModule,
    UsersModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
