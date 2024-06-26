import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  business_sector: string;

  @IsNotEmpty()
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsInt()
  candidate_needed: number;
}
