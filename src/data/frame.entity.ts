import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

export type PublicFrame = Omit<Frame, 'password'>;

@Entity()
export class Frame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  frameId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Photo, (photo) => photo.frame)
  photos: Photo[];
}
