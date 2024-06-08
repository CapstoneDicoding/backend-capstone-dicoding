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
import Axios from 'axios';
import { JobsService } from 'src/jobs/jobs.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cvs')
export class CurriculumVitaesController {
  constructor(
    private readonly curriculumVitaesService: CurriculumVitaesService,
    private readonly gcsService: GcsService,
    private readonly jobsService: JobsService,
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

      const cvData = {
        original_cv_path,
        job_id: +data.job_id,
        candidate_id,
        summarized_cv_path: '',
        accuracy: 0,
        status: cv_status.queuing,
      };

      // Fetch summarized CV path from cloud function
      const createdCv = await this.curriculumVitaesService.create(cvData);
      const summarizedCvResponse = await Axios.post(
        'https://asia-southeast2-dicoding-jobs-capstone.cloudfunctions.net/cv-summarization-function1',
        {
          original_cv_path,
          cv_id: createdCv.id,
        },
      );

      const summarized_cv_path = summarizedCvResponse.data.summarized_cv_path;
      const summarized_cv_json = summarizedCvResponse.data.candidate_cv_data;

      const allCv = await this.curriculumVitaesService.findAllJobCvs({
        job_id: createdCv.job_id,
        page: 1,
        limit: 100,
      });

      const job = await this.jobsService.findById(createdCv.job_id);

      const candidateRecommendationResponse = await Axios.post(
        'https://asia-southeast2-dicoding-jobs-capstone.cloudfunctions.net/recomm-function',
        {
          requirements: job.requirements,
        },
      );
      const accuracy = candidateRecommendationResponse.data.accuracy;
      const status = cv_status.queuing;

      const cvDataUpdate = {
        summarized_cv_path,
        accuracy,
      };

      await this.curriculumVitaesService.update(createdCv.id, cvDataUpdate);

      return {
        message: 'CV berhasil ditambah',
      };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new BadRequestException('Invalid job_id');
      }
      throw new Error('Failed to create CV');
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
