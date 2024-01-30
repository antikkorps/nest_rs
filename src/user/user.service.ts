import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete user.password;
    return user;
  }
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        roles: true,
        pinned_post: true
      },
    });
  
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({ 
      where: { id: userId },
      include: {
        roles: true,
        pinned_post: {
          select: {
            postId: true,
          },
          orderBy: {
            post: {
              createdAt: 'desc'
            }
          }
        },
        savedPost: {
          select: {
            postId: true,
          },
          orderBy: {
            post: {
              createdAt: 'desc'
            }
          }
        },
        userlikes: {
          select: {
            likeType: true,
            likedItemId: true,
          },
          orderBy: {
            post: {
              createdAt: 'desc'
            }
          }
        }
      },
    });
    delete user.password;
    return user;
  }
  async deleteUser(userId: number) {
    return this.prisma.user.delete({ where: { id: userId } });
  }


}
