import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // POST /users - tao user moi
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // validate co ban
    if (!createUserDto.username || !createUserDto.email) {
      throw new BadRequestException('Username va email la  bat buoc');
    }
    return this.userService.create(createUserDto);
  }

  // GET /users - lấy tất cả users
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET /users/:id - lấy user theo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }

    return user;
  }

  // PATH /users/:id - cập nhật user
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(+id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }
    return updatedUser;
  }

  // DELETE /users/:id - xoá user
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const isDeleted = this.userService.remove(+id);

    if (!isDeleted) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }
  }
}
