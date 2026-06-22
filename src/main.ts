import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cấu hình validattion pipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không có trong DTO
      forbidNonWhitelisted: true, // báo lỗi nếu có thuộc tính không hợp lệ
      transform: true, // tự động chuyển đỗi kiểu dữ liệu
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
