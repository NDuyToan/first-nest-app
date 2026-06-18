import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  private users: CreateUserDto[] = [];
  @Get()
  findAll() {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `User with ID: ${id}`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return `User created: ${JSON.stringify(createUserDto)}`;
  }
}
