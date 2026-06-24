import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query('completed') completed?: boolean,
    @Query('search') search?: string,
  ) {
    if (completed !== undefined) {
      return this.tasksService.filterByStatus(completed);
    }
    if (search) {
      return this.tasksService.search(search);
    }
    return this.tasksService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tasksService.findById(+id);
  }

  @Post()
  createTask(@Body() taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.tasksService.create(taskData);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateData: Partial<Task>) {
    return this.tasksService.update(parseInt(id), updateData);
  }

  @Put(':id/completed')
  maskAsComplete(@Param('id') id: string) {
    return this.tasksService.maskAsCompleted(parseInt(id));
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(parseInt(id));
  }
}
