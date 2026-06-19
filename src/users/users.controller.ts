import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { createApiResponse } from 'src/common/decorators/api-response.decorator';

@Controller('users')
export class UsersController {
  private users: CreateUserDto[] = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com' },
  ];
  @Get()
  // findAll() {
  //   return this.users;
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `User with ID: ${id}`;
  // }
  getAllUsers() {
    // return {
    //   data: this.users,
    //   count: this.users.length,
    //   message: 'Danh sach nguoi dung',
    // };
    return createApiResponse(this.users, 'lay danh sach users thanh cong');
  }

  @Get(':id') // router /users/1
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    const user = this.users.find((u) => u.id === userId);

    if (!user) {
      return {
        status: 'error',
        message: 'Khong tim thay nguoi dung',
        code: 404,
      };
    }

    return {
      status: 'success',
      data: user,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return `User created: ${JSON.stringify(createUserDto)}`;
  }
}
