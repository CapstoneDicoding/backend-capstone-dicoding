/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [CompaniesModule, JobsModule, CandidatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
