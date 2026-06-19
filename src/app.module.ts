import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, HelloController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
