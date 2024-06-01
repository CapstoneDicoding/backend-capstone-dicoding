import { Module } from '@nestjs/common';
import { GcsService } from './gcs.service';

@Module({
  providers: [
    {
      provide: 'GCS_CONFIG',
      useValue: {
        projectId: process.env.GOOGLE_CLOUD_PROJECTID,
        keyFilename: './key.json',
        bucketName: process.env.GOOGLE_CLOUD_BUCKET,
      },
    },
    GcsService,
  ],
  exports: ['GCS_CONFIG', GcsService],
})

export class GCSModule {}
