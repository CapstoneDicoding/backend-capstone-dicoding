import { IsEnum, IsOptional, IsString } from 'class-validator';
import { cv_status } from '../entities/curriculum_vitae.entity';

export class UpdateCurriculumVitaeDto {
  @IsOptional()
  @IsString()
  original_cv_path: string;

  @IsOptional()
  @IsEnum(cv_status)
  status: cv_status;
}
