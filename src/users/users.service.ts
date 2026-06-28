// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Tạo user mới
  async create(userData: Partial<User>): Promise<User> {
    console.log('userData', userData);
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  // lấy tất cả user
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // lấy user theo id
  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  // tìm user theo email
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // phân trang
  async findWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      total,
    };
  }

  // update
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, userData);
    return await this.usersRepository.findOne({ where: { id } });
  }

  //delete
  async delete(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      await this.usersRepository.delete(id);
    }
  }

  // Thêm method sử dụng Query Builder
  async findActiveUser(): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: true })
      .getMany();
  }

  // async findActiveUsers(): Promise<User[]> {
  //   return await this.usersRepository
  //     .createQueryBuilder('user')
  //     .where('user.isActive = :isActive', { isActive: true })
  //     .andWhere('user.age > :age', { age: 18 })
  //     .orderBy('user.name', 'ASC')
  //     .getMany();
  // }
}
