import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './CreateTag.dto';


export class UpdateTagDto extends PartialType(CreateTagDto) {}
