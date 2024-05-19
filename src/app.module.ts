/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [CompaniesModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
