import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EditTodoDto } from './dto/edit-todo.dto';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getTodos(@Request() req: any) {
    return this.todoService.findAllbyUserId(req.user.userId);
  }

  @Post()
  createTodo(@Request() req: any, @Body() todoDto: CreateTodoDto) {
    return this.todoService.create(req.user.userId, todoDto.title);
  }

  @Put()
  editTodo(@Request() req: any, @Body() todoDto: EditTodoDto) {
    return this.todoService.editTodo(req.user.userId, todoDto);
  }

  @Patch(':id')
  toggleCompletion(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.todoService.toggleCompletion(req.user.userId, id);
  }
}
