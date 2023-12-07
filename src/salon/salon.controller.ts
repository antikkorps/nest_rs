import { Controller, Delete, Get, Param } from '@nestjs/common';

import { SalonService } from './salon.service';
@Controller('salon')
export class SalonController {
    // READONLY Here??
    constructor(private readonly salonService: SalonService) {}


    // JWTGuard??
    @Get()
    getSalons() {
        return this.salonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.salonService.findOne(+id);
    }


    // Create
    // Patch 
    // Delete
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.salonService.remove(+id);
    }
    // Delete many ?
}
