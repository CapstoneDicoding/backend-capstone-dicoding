/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompaniesDto } from './dto/companies.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(private dbService: PrismaService) {}

  async create(companiesData: CompaniesDto) {
    return await this.dbService.companies.create({
      data: {
        ...companiesData,
        password: await hash(companiesData.password, 10),
      },
    });
  }

  async findAll() {
    return await this.dbService.companies.findMany();
  }

  async findById(id: number) {
    return await this.dbService.companies.findUnique({
      where: { id },
    });
  }

  async update(id: number, companiesData: CompaniesDto) {
    if (companiesData.password) {
      companiesData.password = await hash(companiesData.password, 10);
    }
    return await this.dbService.companies.update({
      where: { id },
      data: companiesData,
    });
  }

  async delete(id: number) {
    return await this.dbService.companies.delete({
      where: { id },
    });
  }
}
