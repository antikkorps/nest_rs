import { PostType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsNotEmpty()
    userId: number;


    @IsInt()
    @IsPositive()
    @Min(0)
    views: number;



    @IsInt()
    @IsPositive()
    @Min(0)
    shared: number


    // Link it to the postTypeDto?
}

// I dont know how to validate the post content and postType so I create a separate class
export class CreatePostTypeChoiceDto {
    @IsInt()
    @IsNotEmpty()
    postId: number

    @IsEnum(PostType)
    type: PostType

    // Link it to the post ContentDto?
}

export class CreatePostContentDto {
    @IsInt()
    @IsNotEmpty()
    postTypeId: number

    @IsString()
    @IsNotEmpty()
    content: string
}


