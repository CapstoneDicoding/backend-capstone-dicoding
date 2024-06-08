import { Module } from '@nestjs/common';
import { CurriculumVitaesService } from './curriculum_vitaes.service';
import { CurriculumVitaesController } from './curriculum_vitaes.controller';
import { PrismaService } from 'src/prisma.service';
import { GCSModule } from 'src/google-cloud.storage/gcs.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [GCSModule, JobsModule],
  exports: [CurriculumVitaesService],
  controllers: [CurriculumVitaesController],
  providers: [CurriculumVitaesService, PrismaService],
})
export class CurriculumVitaesModule {}
