import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(postData: Partial<Post>, user: User): Promise<Post> {
    const post = this.postsRepository.create({
      ...postData,
      user,
    });
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: { user: true },
    });
  }

  async findByUser(userId: number): Promise<Post[]> {
    return await this.postsRepository.find({
      where: { userId },
      relations: { user: true },
    });
  }
}
