import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2a$10$hashedpassword', // Mật khẩu đã hash
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(userData: Partial<User>): User {
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name!,
      email: userData.email!,
      password: userData.password!,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }
}
