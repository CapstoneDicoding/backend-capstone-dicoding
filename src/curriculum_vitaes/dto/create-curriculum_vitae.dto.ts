import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { cv_status } from '../entities/curriculum_vitae.entity';

export class CreateCurriculumVitaeDto {
  @IsInt()
  @IsNotEmpty()
  job_id: number;
}

export class SaveCurriculumVitaeDto {
  @IsNotEmpty()
  @IsString()
  original_cv_path: string;

  @IsNotEmpty()
  @IsString()
  summarized_cv_path: string;

  @IsInt()
  @IsNotEmpty()
  accuracy: number;

  @IsString()
  @IsEnum(cv_status)
  status: cv_status;

  @IsInt()
  @IsNotEmpty()
  candidate_id: number;

  @IsInt()
  @IsNotEmpty()
  job_id: number;
}