import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from './CreateLike.dto';


export class UpdateLikeDto extends PartialType(CreateLikeDto) {}
