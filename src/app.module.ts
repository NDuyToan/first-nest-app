import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // hoặc 'postgres'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nest_learning',
      entities: [User],
      synchronize: true, // Chỉ dùng cho development
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
