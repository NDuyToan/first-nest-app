import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  age?: number;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  // tao user moi
  create(createUserDto: CreateUserDto): User {
    // kiểm tra email đã tồn tại
    const existingUser = this.users.find(
      (user) => user.email === createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email này đã tồn tại');
    }
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  // lay tat ca users
  findAll(): User[] {
    return this.users;
  }

  // tim user theo id
  findOne(id: number): User | undefined {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  // cap nhat user
  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new UserNotFoundException(id);
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  // xoa user
  remove(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new UserNotFoundException(id);
    }
    this.users.splice(userIndex, 1);
    return {
      message: `User with ID ${id} deleted successfully`,
    };
  }
}
