import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { SalonService } from './salon.service';
import { jwtGuard } from 'src/auth/guard';
import { CreateSalonDto } from './dto/CreateSalon.dto';
import { UpdateSalonDto } from './dto/UpdateSalon.dto';
@Controller('salon')
export class SalonController {
    constructor(public salonService: SalonService) {}


    // JWTGuard??
    @UseGuards(jwtGuard)
    @Get()
    getSalons() {
        return this.salonService.findAll();
    }

    @UseGuards(jwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.salonService.findOne(+id);
    }


    // Create
    @UseGuards(jwtGuard)
    @Post()
    create(@Body() createSalonDto: CreateSalonDto) {
      return this.salonService.create(createSalonDto);
    }

    // Patch
    // Add an user verification here to know if he's the owner
    @UseGuards(jwtGuard)
    @Patch(':id')
    editSalon(@Param('id') salonId: string, @Body() updateSalonDto: UpdateSalonDto) {
      const id = parseInt(salonId, 10);
      return this.salonService.editSalon(id, updateSalonDto);
    }

    // Delete
       // Add an user verification here to know if he's the owner
    @UseGuards(jwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.salonService.remove(+id);
    }
    // Delete many ?
}
