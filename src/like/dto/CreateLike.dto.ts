import { LikeType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLikeDto {
    @IsEnum(LikeType)
    @IsNotEmpty()
    @Type(() => String)
    likeType: LikeType;

    @IsInt()
    @IsNotEmpty()
    likedItemId: number;

    // @IsInt()
    // @IsNotEmpty()
    // userId: number;
}

