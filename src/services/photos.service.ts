import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoto, Photo } from '../data/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photosRepository.find();
  }

  findOne(id: string): Promise<Photo> {
    return this.photosRepository.findOne(id);
  }

  async create(photo: CreatePhoto): Promise<void> {
    await this.photosRepository.insert(photo);
  }

  async remove(id: string): Promise<void> {
    await this.photosRepository.delete(id);
  }
}
