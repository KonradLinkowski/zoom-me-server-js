import { Injectable } from '@nestjs/common';
import { PublicFrame } from '../data/frame.entity';
import { FramesService } from './frames.service';

@Injectable()
export class AuthService {
  constructor(private framesService: FramesService) {}

  async validateFrame(id: string, pass: string): Promise<PublicFrame> {
    const frame = await this.framesService.findByFrameId(id);
    if (!frame) return null;
    if (frame.password !== pass) return null;
    delete frame.password;
    return frame;
  }
}
