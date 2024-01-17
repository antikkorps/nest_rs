import { PostType } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer"
import { CreateTagDto } from "src/tag/dto/CreateTag.dto";

export class CreatePostDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsNotEmpty()
    userId: number;


    @IsInt()
    @IsPositive()
    @IsOptional()
    @Min(0)
    views: number;



    @IsInt()
    @IsPositive()
    @IsOptional()
    @Min(0)
    shared: number



    @IsArray()
    @ValidateNested()
    @Type(() => CreateTagDto)
    tags: CreateTagDto[]

    @IsArray()
    @ValidateNested()
    @Type(() => postBodyDto)
    postBody: postBodyDto[]
}

class postBodyDto {

    @IsEnum(PostType)
    @Type(() => String)
    postTypeChoice: PostType;

    @IsArray()
    @ValidateNested()
    @Type(() => postContentDto)
    postContent: postContentDto[]

}

class postContentDto {
    @IsString()
    content: string;
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

