import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { ProductsController } from './products/products.controller';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, TasksModule],
  controllers: [AppController, HelloController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
