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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        ssl:
          configService.get('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        entities: [Frame, Photo],
        synchronize: true,
      }),
      inject: [ConfigService],
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
