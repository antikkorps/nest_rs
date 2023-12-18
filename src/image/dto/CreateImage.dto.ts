import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  // Custom Validation here for isUnique
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
