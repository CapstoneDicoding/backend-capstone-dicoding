import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobsService {
  constructor(private dbService: PrismaService) {}

  async create(jobData: CreateJobDto, company_id: number) {
    return await this.dbService.jobs.create({
      data: {
        ...jobData,
        company_id,
      },
    });
  }

  async findAll() {
    return await this.dbService.jobs.findMany();
  }

  async findById(id: number) {
    return await this.dbService.jobs.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, jobData: UpdateJobDto) {
    return await this.dbService.jobs.update({
      where: { id },
      data: jobData,
    });
  }

  async delete(id: number) {
    return await this.dbService.jobs.delete({
      where: { id },
    });
  }
}
