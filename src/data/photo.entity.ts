import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type CreatePhoto = Omit<Photo, 'id'>;

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
}
