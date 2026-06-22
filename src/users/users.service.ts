import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

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
  private currentId = 1;

  // tao user moi
  create(createUserDto: CreateUserDto): User {
    const newUser = {
      id: this.currentId++,
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
    return this.users.find((u) => u.id === id);
  }

  // cap nhat user
  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex((u) => u.id === id);
    console.log('id', id);
    console.log('userIndex', userIndex);
    if (userIndex < 0) return undefined;
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  // xoa user
  remove(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < initialLength;
  }
}
