import { IsNotEmpty } from 'class-validator';

export class CreateFrameDto {
  @IsNotEmpty()
  frameId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
