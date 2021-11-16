import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frame } from '../data/frame.entity';
import { CreateFrameDto } from '../dto/create-frame.dto';

@Injectable()
export class FramesService {
  constructor(
    @InjectRepository(Frame)
    private framesRepository: Repository<Frame>,
  ) {}

  findAll(): Promise<Frame[]> {
    return this.framesRepository.find();
  }

  findOne(id: string): Promise<Frame> {
    return this.framesRepository.findOne(id);
  }

  findByFrameId(frameId: string): Promise<Frame> {
    return this.framesRepository.findOne({ frameId });
  }

  async create(createFrameDto: CreateFrameDto): Promise<void> {
    await this.framesRepository.insert(createFrameDto);
  }

  async remove(id: string): Promise<void> {
    await this.framesRepository.delete(id);
  }
}
