import { PartialType } from '@nestjs/mapped-types';
import { CreateSalonDto } from './CreateSalon.dto';

export class UpdateSalonDto extends PartialType(CreateSalonDto) {}
