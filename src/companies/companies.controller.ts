import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesDto } from './dto/companies.dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role, Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.recruiter)
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  async createCompanies(@Body() data: CompaniesDto) {
    try {
      return await this.companiesService.create(data);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException();
      } else if (error instanceof PrismaClientValidationError) {
        throw new UnprocessableEntityException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get()
  async getAll() {
    try {
      const companies = await this.companiesService.findAll();
      if (companies.length == 0) {
        throw new NotFoundException();
      }
      return companies;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const companies = await this.companiesService.findById(+id);
      if (companies) {
        return companies;
      }
      throw new NotFoundException();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      } else if (error instanceof PrismaClientValidationError) {
        throw new UnprocessableEntityException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() data: CompaniesDto) {
    try {
      await this.companiesService.update(+id, data);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException();
      } else if (error instanceof PrismaClientValidationError) {
        throw new UnprocessableEntityException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      await this.companiesService.delete(+id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException();
      } else if (error instanceof PrismaClientValidationError) {
        throw new UnprocessableEntityException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
