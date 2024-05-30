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

  async findAll({ page, limit }) {
    const skip = (page - 1) * limit;

    const totalJobs = await this.dbService.jobs.count();
    const totalPages = Math.ceil(totalJobs / limit);

    const jobs = await this.dbService.jobs.findMany({
      skip,
      take: limit,
      include: {
        company: {
          include: {
            user: {
              select: {
                fullname: true,
              },
            },
          },
        },
      },
    });

    return {
      jobs, 
      totalPages,
    }
  }

  async findAllCompanyJobs({ page, limit, company_id }) {
    const skip = (page - 1) * limit;

    const totalJobs = await this.dbService.jobs.count();
    const totalPages = Math.ceil(totalJobs / limit);

    const jobs = await this.dbService.jobs.findMany({
      where: { company_id },
      skip,
      take: limit,
      include: {
        company: {
          include: {
            user: {
              select: {
                fullname: true,
              },
            },
          },
        },
        _count: {
          select: {
            curriculum_vitaes: true,
          },
        },
      },
    });

    return {
      jobs, 
      totalPages,
    }
  }

  async findById(id: number) {
    return await this.dbService.jobs.findUniqueOrThrow({
      where: { id },
      include: {
        company: {
          include: {
            user: {
              select: {
                fullname: true,
              },
            },
          },
        },
      },
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
