import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './CreatePost.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
