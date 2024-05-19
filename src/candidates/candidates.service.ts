import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CandidateDto } from './dto/candidate.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CandidatesService {
  constructor(private dbService: PrismaService) {}

  async create(candidateData: CandidateDto) {
    return await this.dbService.candidates.create({
      data: {
        ...candidateData,
        password: await hash(candidateData.password, 10),
      },
    });
  }

  async findAll() {
    return await this.dbService.candidates.findMany();
  }

  async findById(id: number) {
    return await this.dbService.candidates.findUnique({
      where: { id },
    });
  }

  async update(id: number, candidateData: CandidateDto) {
    if (candidateData.password) {
      candidateData.password = await hash(candidateData.password, 10);
    }
    return await this.dbService.candidates.update({
      where: { id },
      data: candidateData,
    });
  }

  async delete(id: number) {
    return await this.dbService.candidates.delete({
      where: { id },
    });
  }
}
