import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSalonDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    logo: string;

    @IsNotEmpty()
    street: string;

    @IsInt()
    @IsNotEmpty()
    zipcode: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;

}
