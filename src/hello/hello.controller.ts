import { Controller, Get } from '@nestjs/common';

@Controller('hello') // định nghĩa route prefix là '/hello'
export class HelloController {
  @Get() // xử lý request GET đến /hello
  getHello() {
    return {
      message: 'Xin chao',
    };
  }
}

@Controller('api')
export class ApiController {
  @Get('welcome')
  getWelcomeMessage() {
    // nestjs tự động chuyển object thành json
    return {
      status: 'success',
      message: 'chao mung den voi api nestjs',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
