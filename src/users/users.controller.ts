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
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: Partial<User>) {
    return await this.usersService.create(userData);
  }

  @Get()
  async findAll(
    @Query('email') email?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    //return await this.usersService.findActiveUser();
    if (email) {
      return await this.usersService.findByEmail(email);
    }
    if (page && limit) {
      return await this.usersService.findWithPagination(page, limit);
    }

    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return await this.usersService.update(id, updateData);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
