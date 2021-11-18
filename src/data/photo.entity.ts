import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export type CreatePhoto = {
  file: Express.Multer.File;
  frame: string;
};

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @Column()
  frame: string;

  @CreateDateColumn()
  date: Date;
}
