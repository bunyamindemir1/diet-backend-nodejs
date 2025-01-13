import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@Controller()
export class AppController {
  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }
}