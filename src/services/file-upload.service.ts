import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Buffer, key: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.bucket,
        Body: file,
        Key: key,
      })
      .promise();

    return uploadResult;
  }

  async downloadFile(key: string) {
    const s3 = new S3();
    return await s3
      .getObject({
        Bucket: this.bucket,
        Key: key,
      })
      .createReadStream();
  }
}
