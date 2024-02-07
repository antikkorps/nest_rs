import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from './CreateImage.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
