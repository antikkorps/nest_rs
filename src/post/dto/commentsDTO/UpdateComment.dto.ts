import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './CreateComment.dto';



export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
