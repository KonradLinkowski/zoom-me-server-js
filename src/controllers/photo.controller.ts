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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
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

  @Get(':id')
  @UseGuards(AuthGuard('basic'))
  async downloadPhoto(@Param() id: string, @Res({ passthrough: true }) res) {
    const photo = await this.photosService.findOne(id);
    const file = createReadStream(join(process.cwd(), photo.path));
    res.set({
      'Content-Type': photo.type,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(
        photo.fileName,
      )}"`,
    });
    return new StreamableFile(file);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  @Redirect('/', 301)
  uploadFile(
    @Body() uplaodPhotoDto: UploadPhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.photosService.create({
      fileName: file.originalname,
      frame: uplaodPhotoDto.frame,
      path: file.path,
      type: file.mimetype,
    });
  }
}
