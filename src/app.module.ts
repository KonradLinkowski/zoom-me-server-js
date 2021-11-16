import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { Frame } from './data/frame.entity';
import { Photo } from './data/photo.entity';
import { storage } from './config/multer';
import { PhotosService } from './services/photos.service';
import { PhotoController } from './controllers/photo.controller';
import { FramesController } from './controllers/frames.controller';
import { FramesService } from './services/frames.service';
import { AuthService } from './services/auth.service';
import { HttpStrategy } from './config/http.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ramka.sqlite',
      entities: [Frame, Photo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Frame, Photo]),
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [AppController, PhotoController, FramesController],
  providers: [PhotosService, FramesService, AuthService, HttpStrategy],
})
export class AppModule {}
