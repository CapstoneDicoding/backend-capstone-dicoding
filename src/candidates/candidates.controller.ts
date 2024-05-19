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
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidateDto } from './dto/candidate.dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Controller('candidates')
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  @Post()
  async createCandidate(@Body() data: CandidateDto) {
    try {
      return await this.candidatesService.create(data);
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
      const candidates = await this.candidatesService.findAll();
      if (candidates.length == 0) {
        throw new NotFoundException();
      }
      return candidates;
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
      const candidate = await this.candidatesService.findById(+id);
      if (candidate) {
        return candidate;
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
  async updateById(@Param('id') id: string, @Body() data: CandidateDto) {
    try {
      await this.candidatesService.update(+id, data);
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
      await this.candidatesService.delete(+id);
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
