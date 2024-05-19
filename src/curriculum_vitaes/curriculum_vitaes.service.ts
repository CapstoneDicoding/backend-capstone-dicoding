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

  async findById(id: number) {
    return await this.dbService.curriculum_vitaes.findUniqueOrThrow({
      where: { id },
      include: {
        candidate: {
          select: {
            fullname: true,
            photo_path: true,
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
