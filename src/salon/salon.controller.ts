import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { SalonService } from './salon.service';
import { VerifyRoles, jwtGuard } from 'src/auth/guard';
import { CreateSalonDto } from './dto/CreateSalon.dto';
import { UpdateSalonDto } from './dto/UpdateSalon.dto';
import { AuthUserProps } from 'types/all';
import { User } from 'helpers/getUser';
@Controller('salon')
export class SalonController {
  constructor(public salonService: SalonService) {}

  @UseGuards(jwtGuard, new VerifyRoles('super_admin'))
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
  @UseGuards(jwtGuard)
  @Patch(':id')
  editSalon(
    @Param('id') salonId: string,
    @Body() updateSalonDto: UpdateSalonDto,
    @User() user: AuthUserProps,
  ) {
    const id = parseInt(salonId, 10);
    return this.salonService.editSalon(id, updateSalonDto, user);
  }

  // Delete
  @UseGuards(jwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: AuthUserProps) {
    return this.salonService.remove(+id, user);
  }
  // Delete many ?
}
