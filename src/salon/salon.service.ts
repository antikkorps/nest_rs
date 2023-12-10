import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalonDto } from './dto/CreateSalon.dto';
import { UpdateSalonDto } from './dto/UpdateSalon.dto';

@Injectable()
export class SalonService {
    constructor(public prisma: PrismaService) {}

    async findAll() {
        return this.prisma.salon.findMany(); 
    }

    async findOne(id: number) {
        return this.prisma.salon.findUnique({
          where: { id },
        });
    }

    async create(createSalonDto: CreateSalonDto) {
        return this.prisma.salon.create({
          data: createSalonDto,
        });
    }

    async remove(id: number) {
        return this.prisma.salon.delete({
          where: { id },
        });
    }
    
    async editSalon(salonId: number, updateSalonDto: UpdateSalonDto) {
        const salon = await this.prisma.salon.update({
          where: { id: salonId },
          data: { ...updateSalonDto},
        });
        return salon;
      }
}
