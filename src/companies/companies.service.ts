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

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class CompaniesService {
//   private readonly companies = [];

//   getCompanies() {
//     if (this.companies.length === 0) {
//       return {
//         code: 404,
//         message: 'Tidak ada data perusahaan yang tersimpan',
//       };
//     } else {
//       return {
//         companies: this.companies,
//         code: 200,
//         message: 'Data perusahaan berhasil ditampilkan',
//       };
//     }
//   }

//   addCompany(companyData) {
//     const { username, password, fullname, photo_path, location, description } =
//       companyData;
//     const id = this.companies.length + 1;
//     const createdAt = new Date().toISOString();
//     const updatedAt = createdAt;
//     this.companies.push({
//       id,
//       username,
//       password,
//       fullname,
//       photo_path,
//       location,
//       description,
//       createdAt,
//       updatedAt,
//     });
//     return {
//       code: 201,
//       message: 'Akun rekruter/perusahaan berhasil dibuat',
//     };
//   }

//   getCompanyById(id: string) {
//     const selected = this.companies.find((company) => company.id === id);
//     if (selected) {
//       return {
//         selected,
//         code: 200,
//         message: 'Detail perusahaan berhasil ditampilkan',
//       };
//     } else {
//       return {
//         code: 404,
//         message: 'Perusahaan tidak ditemukan',
//       };
//     }
//   }

//   patchCompany(id: string, companyData) {
//     const { username, password, fullname, photo_path, location, description } =
//       companyData;
//     const updatedAt = new Date().toISOString();
//     const index = this.companies.findIndex((company) => company.id === id);
//     if (index !== -1) {
//       this.companies[index] = {
//         ...this.companies[index],
//         username,
//         password,
//         fullname,
//         photo_path,
//         location,
//         description,
//         updatedAt,
//       };
//       return {
//         code: 200,
//         message: 'Akun rekruter/perusahaan berhasil diperbarui',
//       };
//     } else {
//       return {
//         code: 404,
//         message: 'Perusahaan tidak ditemukan',
//       };
//     }
//   }

//   deleteCompany(id: string) {
//     const index = this.companies.findIndex((company) => company.id === id);
//     if (index !== -1) {
//       this.companies.splice(index, 1);
//       return {
//         code: 200,
//         message: 'Akun rekruter/perusahaan berhasil dihapus',
//       };
//     } else {
//       return {
//         code: 404,
//         message: 'Perusahaan tidak ditemukan',
//       };
//     }
//   }
// }
