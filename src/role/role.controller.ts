import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/CreateRole.dto';
import { UpdateRoleDto } from './dto/UpdateRole.dto';

@Controller('role')
export class RoleController {
    constructor(public roleService: RoleService) {}
    // All the method need to be admin or super admin verify



    // Get all roles
    @Get()
    getRoles() {
        return this.roleService.findAll();
    }

    // Get one role by slug
    @Get(':slug')
    findOne(@Param('slug') slug: string) {
      return this.roleService.findOne(slug);
    }

    // Create role
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
      return this.roleService.create(createRoleDto);
    }

    // Edit role
    @Patch(':id')
    editSalon(@Param('id') roleId: string, @Body() updateRoleDto: UpdateRoleDto) {
      const id = parseInt(roleId, 10);
      return this.roleService.editSalon(id, updateRoleDto);
    }

    // Delete role
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.roleService.remove(+id);
    }
}
