import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './CreateRole.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
