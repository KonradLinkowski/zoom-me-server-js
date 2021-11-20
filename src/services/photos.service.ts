import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { CreatePhoto, Photo } from '../data/photo.entity';
import { FileUploadService } from './file-upload.service';
import { v4 as uuid } from 'uuid';
import { extname, join } from 'path';
import { Readable } from 'stream';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
    private fileUploadService: FileUploadService,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photosRepository.find();
  }

  findByFrame(frame: number, since: string): Promise<Photo[]> {
    return this.photosRepository.find({ where: { frame, date: MoreThan(since) } });
  }

  findOne(id: string): Promise<Photo> {
    return this.photosRepository.findOne(id);
  }

  async download(path: string): Promise<Readable> {
    return this.fileUploadService.downloadFile(path);
  }

  async create(photo: CreatePhoto): Promise<void> {
    const fileName = uuid() + extname(photo.file.originalname);
    const path = join(photo.frame, fileName);
    await this.fileUploadService.uploadFile(photo.file.buffer, path);
    await this.photosRepository.insert({
      fileName,
      frame: photo.frame,
      path,
      type: photo.file.mimetype,
    });
  }

  async remove(id: string): Promise<void> {
    await this.photosRepository.delete(id);
  }
}
