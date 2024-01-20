import { PostType, UserChoiceStatus } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer"

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
    @Type(() => CreateTagFromPostDto)
    tags: CreateTagFromPostDto[]

    @IsArray()
    @ValidateNested()
    @Type(() => postBodyDto)
    postBody: postBodyDto[]

    @IsEnum(UserChoiceStatus)
    @Type(() => String)
    user_status: UserChoiceStatus;

}

class CreateTagFromPostDto {
    @IsString()
    name: string;
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

