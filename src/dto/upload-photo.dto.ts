import { IsNotEmpty } from 'class-validator';

export class UploadPhotoDto {
  @IsNotEmpty()
  frame: string;
}
