import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PublicFrame } from 'src/data/frame.entity';

@Injectable()
export class HttpStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<PublicFrame> {
    const frame = await this.authService.validateFrame(username, password);
    if (!frame) {
      throw new UnauthorizedException();
    }
    return frame;
  }
}
