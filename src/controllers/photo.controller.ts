import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPhotoDto } from 'src/dto/upload-photo.dto';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
export class PhotoController {
  constructor(private photosService: PhotosService) {}

  @Get()
  @UseGuards(AuthGuard('basic'))
  getPhotos() {
    return this.photosService.findAll();
  }

  @Get('frame/:frame')
  @UseGuards(AuthGuard('basic'))
  async getFramePhotosIds(
    @Param() frameId: number,
    @Query('since') since: string,
  ) {
    const photos = await this.photosService.findByFrame(frameId, since);
    console.log(photos);
    const string = photos.map(photo => photo.id).join('\n');
    console.log(string);
    return string;
  }

  @Get(':id')
  @UseGuards(AuthGuard('basic'))
  async downloadPhoto(@Param() id: string, @Res({ passthrough: true }) res) {
    const photo = await this.photosService.findOne(id);
    const readStream = await this.photosService.download(photo.path);
    res.set({
      'Content-Type': photo.type,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(
        photo.fileName,
      )}"`,
    });
    return new StreamableFile(readStream);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  @Redirect('/', 301)
  uploadFile(
    @Body() uplaodPhotoDto: UploadPhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.photosService.create({
      frame: uplaodPhotoDto.frame,
      file,
    });
  }
}
