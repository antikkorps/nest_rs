import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalonService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.salon.findMany(); 
    }

    async findOne(id: number) {
        return this.prisma.salon.findUnique({
          where: { id },
        });
    }

    async remove(id: number) {
        return this.prisma.salon.delete({
          where: { id },
        });
    }
}
