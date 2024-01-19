import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalonDto } from './dto/CreateSalon.dto';
import { UpdateSalonDto } from './dto/UpdateSalon.dto';
import { isOwnerOrSuperAdmin } from 'policies/isAdminOrOwner';
import { AuthUserProps } from 'types/all';

@Injectable()
export class SalonService {
    constructor(public prisma: PrismaService) {}

    async findAll() {
        return this.prisma.salon.findMany(); 
    }

    async findOne(id: number) {
        const salonToSee = await this.prisma.salon.findUnique({
          where: { id },
        });
        if(!salonToSee) throw new NotFoundException('Salon not found');
        return salonToSee;
    }

    async create(createSalonDto: CreateSalonDto) {
        return this.prisma.salon.create({
          data: createSalonDto,
        });
    }

    async remove(id: number, user: AuthUserProps) {
        const salonToDelete = await this.prisma.salon.findUnique({
          where: { id },
        });
        if(!salonToDelete) throw new NotFoundException('Salon not found');
        
        const isAuthorizeToUpdate = await isOwnerOrSuperAdmin({
          ownerId: salonToDelete.userId,
          user: user
        }); 
        if(!isAuthorizeToUpdate) throw new ForbiddenException("You don't have permission to edit this post.");
        
        return this.prisma.salon.delete({
          where: { id },
        });
    }
    
    async editSalon(salonId: number, updateSalonDto: UpdateSalonDto, user: AuthUserProps) {
        
        const salonToUpdate = await this.prisma.salon.findUnique({
          where: { id: salonId },
        });
        if(!salonToUpdate) throw new NotFoundException('Post not found');

        const isAuthorizeToUpdate = await isOwnerOrSuperAdmin({
          ownerId: salonToUpdate.userId,
          user: user
        }); 
        if(!isAuthorizeToUpdate) throw new ForbiddenException("You don't have permission to edit this post.");
        

        const salon = await this.prisma.salon.update({
          where: { id: salonId },
          data: { ...updateSalonDto},
        });
        return salon;
      }
}
