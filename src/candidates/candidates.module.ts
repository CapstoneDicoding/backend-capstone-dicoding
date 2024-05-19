import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, PrismaService],
})
export class CandidatesModule {}
