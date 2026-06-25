import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { Module } from '@nestjs/common';
import { Post } from './posts/post.entity';
import { PostsModule } from './posts/posts.module';
import { ProductsController } from './products/products.controller';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Post],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
      }),

      inject: [ConfigService],
    }),
    PostsModule,
  ],
  controllers: [AppController, HelloController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
