import { Module } from '@nestjs/common';
import { CurriculumVitaesService } from './curriculum_vitaes.service';
import { CurriculumVitaesController } from './curriculum_vitaes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [CurriculumVitaesService],
  controllers: [CurriculumVitaesController],
  providers: [CurriculumVitaesService, PrismaService],
})
export class CurriculumVitaesModule {}
