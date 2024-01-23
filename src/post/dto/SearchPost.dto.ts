import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";

export class SearchPostDto {
    @IsString()
    @IsOptional()
    limit: string;

    @IsString()
    @IsOptional()
    orderByWhat: string;

    @IsString()
    @IsOptional()
    orderBy: string;

}

