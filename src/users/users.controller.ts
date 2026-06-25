import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users-old.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // POST /users - tao user moi
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Dữ liệu đã được validate tự động

    const user = this.userService.create(createUserDto);
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  // GET /users - lấy tất cả users
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET /users/:id - lấy user theo ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }

    return user;
  }

  // PUT /users/:id - cập nhật user
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = this.userService.update(id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }
    return updatedUser;
  }

  // DELETE /users/:id - xoá user
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.userService.remove(id);
  }
}
