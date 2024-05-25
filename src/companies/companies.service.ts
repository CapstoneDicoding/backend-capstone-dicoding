/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompaniesDto } from './dto/companies.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(private dbService: PrismaService) {}

  async create(companiesData: CompaniesDto) {
    const { username, password, fullname, photo_path, location, description } =
      companiesData;

    const recruiter = await this.dbService.users.create({
      data: {
        username,
        password: await hash(password, 10),
        fullname,
        photo_path,
        role: 'recruiter',
      },
    });

    await this.dbService.companies.create({
      data: {
        user_id: recruiter.id,
        location,
        description,
      },
    });
  }

  async findAll() {
    return await this.dbService.companies.findMany({
      include: {
        user: true,
      },
    });
  }

  async findById(id: number) {
    return await this.dbService.companies.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: number, companiesData: CompaniesDto) {
    const { username, password, fullname, photo_path, location, description } =
      companiesData;

    await this.dbService.users.update({
      where: { id },
      data: {
        username,
        password: await hash(password, 10),
        fullname,
        photo_path,
      },
    });

    await this.dbService.companies.updateMany({
      where: { user_id: id },
      data: {
        location,
        description,
      },
    });
  }

  async delete(id: number) {
    await this.dbService.companies.deleteMany({
      where: { user_id: id },
    });

    await this.dbService.users.delete({
      where: { id },
    });
  }
}
