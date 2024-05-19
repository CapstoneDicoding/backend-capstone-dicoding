import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { CurriculumVitaesService } from './curriculum_vitaes.service';
import { CreateCurriculumVitaeDto } from './dto/create-curriculum_vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum_vitae.dto';
import { cv_status } from './entities/curriculum_vitae.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('cvs')
export class CurriculumVitaesController {
  constructor(private readonly curriculumVitaesService: CurriculumVitaesService) {}

  @Post()
  async create(@Body() data: CreateCurriculumVitaeDto) {
    try {
      // TO BE DEVELOPED
      const candidate_id = 1;
      const summarized_cv_path = 'tes';
      const accuracy = 100;
      const status = cv_status.queueing;
  
      const cvData = {
        ...data,
        candidate_id,
        summarized_cv_path,
        accuracy,
        status,
      }
  
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

  @Get()
  async getAll() {
    const cvs = await this.curriculumVitaesService.findAll();

    return {
      message: 'CV berhasil ditampilkan',
      data: {
        cvs,
      },
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const cv = await this.curriculumVitaesService.findById(+id);

      return {
        message: 'CV berhasil ditampilkan',
        data: {
          cv,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('CV tidak ditemukan');
        }
      }
    }
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() data: UpdateCurriculumVitaeDto) {
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
