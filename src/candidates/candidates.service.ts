import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CandidateDto } from './dto/candidate.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CandidatesService {
  constructor(private dbService: PrismaService) {}

  async create(candidateData: CandidateDto) {
    const { username, password, fullname, photo_path, email, notelp, skills } =
      candidateData;

    const user = await this.dbService.users.create({
      data: {
        username,
        password: await hash(password, 10),
        fullname,
        photo_path,
        role: 'candidate',
      },
    });

    await this.dbService.candidates.create({
      data: {
        user_id: user.id,
        email,
        notelp,
        skills,
      },
    });
  }

  async findAll() {
    return await this.dbService.candidates.findMany({
      include: {
        user: true,
      },
    });
  }

  async findById(id: number) {
    return await this.dbService.candidates.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: number, candidateData: CandidateDto) {
    const { username, password, fullname, photo_path, email, notelp, skills } =
      candidateData;

    await this.dbService.candidates.updateMany({
      where: { user_id: id },
      data: {
        email,
        notelp,
        skills,
      },
    });

    await this.dbService.users.update({
      where: { id },
      data: {
        username,
        password: await hash(password, 10),
        fullname,
        photo_path,
      },
    });
  }

  async delete(id: number) {
    await this.dbService.candidates.deleteMany({
      where: { user_id: id },
    });

    await this.dbService.users.delete({
      where: { id },
    });
  }
}
