import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSalonDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    logo: string;

    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    zipcode: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsInt()
    @IsNotEmpty()
    userId: number;

}
