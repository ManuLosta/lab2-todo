import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getTodos(@Request() req: any) {
    return this.todoService.findAllbyUserId(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTodo(@Request() req: any, @Body() todoDto: CreateTodoDto) {
    return this.todoService.create(req.user.userId, todoDto.title);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  editTodo(@Request() req: any, @Body() todoDto: EditTodoDto) {
    return this.todoService.editTodo(req.user.userId, todoDto);
  }
}
