import { Controller, Get, Render } from '@nestjs/common';
import { FramesService } from 'src/services/frames.service';
@Controller()
export class AppController {
  constructor(private framesService: FramesService) {}

  @Get()
  @Render('uploader')
  async getPage() {
    return {
      frames: await this.framesService.findAll(),
    };
  }
}
