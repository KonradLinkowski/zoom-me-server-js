import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFrameDto } from '../dto/create-frame.dto';
import { FramesService } from '../services/frames.service';

@Controller('frames')
export class FramesController {
  constructor(private framesService: FramesService) {}

  @Get()
  getFrames() {
    return this.framesService.findAll();
  }

  @Post()
  createFrame(@Body() createFrameDto: CreateFrameDto) {
    return this.framesService.create(createFrameDto);
  }
}
