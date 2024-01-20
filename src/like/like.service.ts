import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/CreateLike.dto';
import { AuthUserProps } from 'types/all';

@Injectable()
export class LikeService {
    constructor(public prisma: PrismaService) {}

    async create(createLikeDto: CreateLikeDto, user: AuthUserProps) {
        const { likeType, likedItemId } = createLikeDto;
        
        // Check if item exists
        if(likeType === "POST") {
            const post = await this.prisma.post.findUnique({
                where: { id: likedItemId}
            });
            if(!post) throw new NotFoundException('Post not found');
        } else if(likeType === "COMMENT") {

        } else if(likeType === "MEDIA") {

        } else if(likeType === "IMAGE") {

        } else if(likeType === "INSTANT_MESSAGE") {

        }

        const existingLike = await this.prisma.like.findUnique({
            where: {
              userId_likedItemId: {
                userId: user.id,
                likedItemId
              },
            }
        })
        if (existingLike) {
            return await this.prisma.like.delete({
              where: {
                id: existingLike.id,
              },
            });
          } else {
            return await this.prisma.like.create({
                data: {
                  likeType,
                  likedItemId,
                  userId: user.id,
                },
            });
          }
    }
}
