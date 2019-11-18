import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags('帖子')
export class AppController {

  @Get()
  index() {
    return 'index'
  }
}
