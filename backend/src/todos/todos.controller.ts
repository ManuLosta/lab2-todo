import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserTodos(@Request() req: any) {
    return this.todoService.findAllbyUserId(req.user.userId);
  }
}
