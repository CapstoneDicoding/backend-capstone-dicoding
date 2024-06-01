import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaService } from 'src/prisma.service';
import { CurriculumVitaesModule } from 'src/curriculum_vitaes/curriculum_vitaes.module';

@Module({
  imports: [CurriculumVitaesModule],
  controllers: [JobsController],
  providers: [JobsService, PrismaService],
})
export class JobsModule {}
