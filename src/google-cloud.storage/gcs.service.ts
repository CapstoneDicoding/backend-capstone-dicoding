import { Injectable, Inject } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class GcsService {
  private storage: Storage;

  constructor(@Inject('GCS_CONFIG') private gcsConfig) {
    this.storage = new Storage({
      projectId: this.gcsConfig.projectId,
      keyFilename: this.gcsConfig.keyFilename,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.gcsConfig.bucketName);
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    return new Promise<string>((resolve, reject) => {
      stream.on('error', (error) => {
        console.log(error)
      });
      stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.gcsConfig.bucketName}/${fileName}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  }
}
