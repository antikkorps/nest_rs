import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/CreateRole.dto';
import { UpdateRoleDto } from './dto/UpdateRole.dto';

@Injectable()
export class RoleService {
    constructor(public prisma: PrismaService) {}

    async findAll() {
        return this.prisma.role.findMany(); 
    }

    async findOne(slug: string) {
        return this.prisma.role.findUnique({
          where: { slug },
        });
    }


    async create(createRoleDto: CreateRoleDto) {
        return this.prisma.role.create({
          data: createRoleDto,
        });
    }

    async editSalon(roleId: number, updateRoleDto: UpdateRoleDto) {
        const salon = await this.prisma.role.update({
          where: { id: roleId },
          data: { ...updateRoleDto},
        });
        return salon;
    }

    async remove(id: number) {
        return this.prisma.role.delete({
          where: { id },
        });
    }
}
