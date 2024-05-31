import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Roles(Role.recruiter)
  @Post()
  async create(@Request() req, @Body() data: CreateJobDto) {
    const { company_id } = req.user

    await this.jobsService.create(data, company_id);
    
    return {
      message: 'Lowongan pekerjaan berhasil dibuat',
    };
  }

  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    const { jobs, totalPages } = await this.jobsService.findAll({
      page: +page || 10,
      limit: +limit || 10,
    });

    return {
      message: 'Lowongan pekerjaan berhasil ditampilkan',
      data: {
        jobs,
        pagination: {
          totalPages,
        },
      },
    };
  }

  @Get('/company')
  async getAllCompanyJobs(
    @Request() req: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { company_id } = req.user;
    const { jobs, totalPages } = await this.jobsService.findAllCompanyJobs({
      page: +page || 10,
      limit: +limit || 10,
      company_id,
    });

    return {
      message: 'Lowongan pekerjaan berhasil ditampilkan',
      data: {
        jobs,
        pagination: {
          totalPages,
        },
      },
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const job = await this.jobsService.findById(+id);

      return {
        message: 'Lowongan pekerjaan berhasil ditampilkan',
        data: {
          job,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Lowongan pekerjaan tidak ditemukan');
        }
      }
    }
  }

  @Roles(Role.recruiter)
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() data: UpdateJobDto) {
    try {
      await this.jobsService.update(+id, data);

      return {
        message: 'Lowongan pekerjaan berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Lowongan pekerjaan tidak ditemukan');
        }
      }
    }
  }

  @Roles(Role.recruiter)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      await this.jobsService.delete(+id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Lowongan pekerjaan tidak ditemukan');
        }
      }
    }
  }
}
