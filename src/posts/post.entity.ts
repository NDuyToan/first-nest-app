import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_DATE' })
  updatedAt: Date;

  // quan hẹ many-to-one: nhiều posts thuộc về 1 user
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' }) // tạo foreign key
  user: User;

  @Column()
  userId: number; // foreign key column
}
