import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CurriculumVitaesService } from './curriculum_vitaes.service';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum_vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum_vitae.dto';
import { cv_status } from './entities/curriculum_vitae.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { GcsService } from 'src/google-cloud.storage/gcs.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cvs')
export class CurriculumVitaesController {
  constructor(
    private readonly curriculumVitaesService: CurriculumVitaesService,
    private readonly gcsService: GcsService,
  ) {}

  @Roles(Role.candidate)
  @Post()
  @UseInterceptors(FileInterceptor('cv'))
  async create(
    @Request() req: any,
    @Body() data: CreateCurriculumVitaeDto,
    @UploadedFile() cv: Express.Multer.File,
  ) {
    try {
      const { candidate_id } = req.user;
      const original_cv_path = await this.gcsService.uploadFile(cv);

      // TO BE DEVELOPED
      const summarized_cv_path = 'tes';
      const accuracy = 100;
      const status = cv_status.queuing;

      const cvData = {
        original_cv_path,
        job_id: +data.job_id,
        candidate_id,
        summarized_cv_path,
        accuracy,
        status,
      };

      await this.curriculumVitaesService.create(cvData);

      return {
        message: 'CV berhasil ditambah',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Invalid job_id');
        }
      }
    }
  }

  @Roles(Role.recruiter)
  @Get()
  async getAll() {
    const cvs = await this.curriculumVitaesService.findAll();

    return cvs;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const cv = await this.curriculumVitaesService.findById(+id);

      return cv;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('CV tidak ditemukan');
        }
      }
    }
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: UpdateCurriculumVitaeDto,
  ) {
    try {
      await this.curriculumVitaesService.update(+id, data);

      return {
        message: 'CV berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('CV tidak ditemukan');
        }
      }
    }
  }

  @Roles(Role.candidate)
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      await this.curriculumVitaesService.delete(+id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('CV tidak ditemukan');
        }
      }
    }
  }
}
