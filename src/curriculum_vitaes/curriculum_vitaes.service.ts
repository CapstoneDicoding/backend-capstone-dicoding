import { Injectable } from '@nestjs/common';
import { SaveCurriculumVitaeDto } from './dto/create-curriculum_vitae.dto';
import { UpdateCurriculumVitaeDto } from './dto/update-curriculum_vitae.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CurriculumVitaesService {
  constructor(private dbService: PrismaService) {}

  async create(cvData: SaveCurriculumVitaeDto) {
    return await this.dbService.curriculum_vitaes.create({
      data: {
        ...cvData,
      },
    });
  }

  async findAll() {
    return await this.dbService.curriculum_vitaes.findMany();
  }

  async findAllJobCvs({ job_id, page, limit }) {
    const skip = (page - 1) * limit;

    const totalcvs = await this.dbService.curriculum_vitaes.count({
      where: { job_id },
    });
    const totalPages = Math.ceil(totalcvs / limit);

    const cvs = await this.dbService.curriculum_vitaes.findMany({
      skip,
      take: limit,
      where: { job_id },
      orderBy: {
        accuracy: 'desc',
      },
      include: {
        candidate: {
          select: {
            user: {
              select: {
                fullname: true,
              },
            },
            skills: true,
          },
        },
      },
    });

    return {
      cvs,
      totalPages,
    };
  }

  async findById(id: number) {
    return await this.dbService.curriculum_vitaes.findUniqueOrThrow({
      where: { id },
      include: {
        candidate: {
          select: {
            user: {
              select: {
                fullname: true,
                photo_path: true,
              },
            },
            email: true,
            notelp: true,
            skills: true,
          },
        },
        job: {
          select: {
            name: true,
            requirements: true,
          },
        },
      },
    });
  }

  async update(id: number, cvData: UpdateCurriculumVitaeDto) {
    return await this.dbService.curriculum_vitaes.update({
      where: { id },
      data: cvData,
    });
  }

  async delete(id: number) {
    return await this.dbService.curriculum_vitaes.delete({
      where: { id },
    });
  }
}
