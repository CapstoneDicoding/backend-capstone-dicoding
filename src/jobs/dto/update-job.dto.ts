import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  business_sector?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsInt()
  candidate_needed?: number;
}
