import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserProps } from 'types/all';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { isOwnerOrSuperAdmin } from 'policies/isAdminOrOwner';
import { SearchPostDto } from './dto/SearchPost.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class PostService {
  constructor(public prisma: PrismaService) {}

  // In this method we will use the params : pagination, search (user, tag), orbderBy (view, share, likes, comments)
    async findAll(query: SearchPostDto) {
      let orderByClause: any = {};
      const orderByWhat = query.orderByWhat; // ça peut être views / repost
      const orderBy = query.orderBy;

      if (!orderByWhat || !orderBy) {
        orderByClause = { createdAt: "desc" };
      }
      else if (['views', 'repost', 'shared', 'createdAt', 'updatedAt'].includes(orderByWhat)) {
        orderByClause = { [orderByWhat]: orderBy };
      }
      else if (['likes, comments']) {
        orderByClause = { [orderByWhat]: {
          _count: orderBy
        } };
      }

      return this.prisma.post.findMany({
        orderBy: [
          orderByClause
        ],
        include: {
              user: true,
              // comments: true,
              tags: true,
              postTypeChoice: {
                  include: {
                      content: true
                  }
              },
              likes: true
          }
      }); 
    }

    async findOne(id: number) {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          user: true,
          comments: true,
          tags: true,
          postTypeChoice: {
              include: {
                  content: true
              }
          },
          likes: true
      }
      });

      if(!post) throw new NotFoundException('Post not found');
      return post;
    }

    async remove(id: number, user: AuthUserProps) {
      const postToDelete = await this.prisma.post.findUnique({
          where: { id }
      });

      if(!postToDelete) throw new NotFoundException('Post not found');
      
      const isAuthorizeToUpdate = await isOwnerOrSuperAdmin({
          ownerId: postToDelete.userId,
          user: user
      }); 
      if(!isAuthorizeToUpdate) throw new ForbiddenException("You don't have permission to edit this post.");
      
      await this.prisma.postTag.deleteMany({ where: { postId: id } });
      await this.prisma.postTypeChoice.deleteMany({ where: { postId: id } });
      await this.prisma.pinnedPost.deleteMany({where: { postId: id} });
      return this.prisma.post.delete({
        where: { id },
      });
    }

    async create(createPostDto: CreatePostDto) {
        const { description, userId, tags, postBody, user_status } = createPostDto;
        // Create or connect the tags to the actual post.
        const tagsConnectOrCreate = tags.map(tag => ({
            where: { name: tag.name },
            create: { name: tag.name },
        }));

        // Here we create all the post content from the postBody entry.
        // It's an array of some data.
        const postTypeChoiceCreate = postBody.map(body => ({
            type: body.postTypeChoice,
            content: {
              create: body.postContent.map(content => ({
                content: content.content,
              })),
            },
          }));

        return this.prisma.post.create({
          data: {
            description,
            user_status,
            user: {
                connect: { id: userId } 
            },

            tags: {
                create: tagsConnectOrCreate.map(tag => ({
                    tag: {
                        connectOrCreate: tag,
                    },
                })),
            },
            postTypeChoice: {
                create: postTypeChoiceCreate,
            },
          },
        });
    }

    async editPost(postId: number, updatePostDto: UpdatePostDto, user: AuthUserProps) {
        const { description, userId, tags, postBody, user_status } = updatePostDto;
        const postToUpdate = await this.prisma.post.findUnique({
            where: { id: postId }
        });

        if(!postToUpdate) throw new NotFoundException('Post not found');
        
        // Check if the User can do this action
        const isAuthorizeToUpdate = await isOwnerOrSuperAdmin({
            ownerId: postToUpdate.userId,
            user: user
        }); 
        if(!isAuthorizeToUpdate) throw new ForbiddenException("You don't have permission to edit this post.");
        
        
        // I think we must delete the pivot entry and replace by the new, even they're the same
        await this.prisma.postTag.deleteMany({ where: { postId } });
        await this.prisma.postTypeChoice.deleteMany({ where: { postId } });

        // Start to createOrconnect the new tags
        const tagsConnectOrCreate = tags.map(tag => ({
            where: { name: tag.name },
            create: { name: tag.name },
        }));

        // Create the postBody 
        const postTypeChoiceCreate = postBody.map(body => ({
            type: body.postTypeChoice,
            content: {
                create: body.postContent.map(content => ({
                    content: content.content,
                })),
            },
        }))

        const updatedPost = await this.prisma.post.update({
          where: { id: postId},
          data: {
              description,
              user_status,
              tags: {
                  create: tagsConnectOrCreate.map(tag => ({
                      tag: {
                          connectOrCreate: tag,
                      },
                  })),
              },
              postTypeChoice: {
                  create: postTypeChoiceCreate,
              },
          }
      })

      return updatedPost;
    }

    async findByUser(id: number) {
      const user = await this.prisma.user.findUnique({
        where: {id}
      })
      if (!user) throw new NotFoundException('User not found');
      const posts = await this.prisma.post.findMany({
        where: {
          userId: id,
        },
        include: {
          user: true,
          comments: true,
          tags: true,
          postTypeChoice: {
            include: {
              content: true,
            },
          },
          likes: true,
        },
      });

      if(posts.length === 0) throw new NotFoundException('No posts found');

      return posts;
    }

    async increaseView(id: number) {
  
      const post = await this.prisma.post.findUnique({
          where: { id }
      });
      // return post.views +  BigInt(1);
      if(post) {
        const currentViews = post.views || 0;
        const newViews = Number(currentViews) + 1;
        return await this.prisma.post.update({
          where: { id },
          data: {
            views: newViews,
          }
        })
      } else {
        throw new NotFoundException('Post not found');
      }
 
    }

    async increaseSharing(id: number) {
  
      const post = await this.prisma.post.findUnique({
          where: { id }
      });
      if(post) {
        const currentSharing = post.shared || 0;
        const newSharing = Number(currentSharing) + 1;
        return await this.prisma.post.update({
          where: { id },
          data: {
            shared: newSharing,
          }
        })
      } else {
        throw new NotFoundException('Post not found');
      }
 
    }

    async increaseRepost(id: number) {
  
      const post = await this.prisma.post.findUnique({
          where: { id }
      });
      if(post) {
        const currentRepost = post.repost || 0;
        const newRepost = Number(currentRepost) + 1;
        return await this.prisma.post.update({
          where: { id },
          data: {
            repost: newRepost,
          }
        })
      } else {
        throw new NotFoundException('Post not found');
      }
 
    }

    async addPinnedPost(id: number, user: AuthUserProps) {
      // I added the where userId verification, then the isAuthorizeToPinned is not 100% usefull I think cause the 404 will be triggered before the authorization...
      // But for now I maybe let a failure, so more security is better
      const post = await this.prisma.post.findUnique({
        where: { id: id, userId: user.id },
      })
      if(post) {
        const isAuthorizeToPinned = await isOwnerOrSuperAdmin({
          ownerId: post.userId,
            user: user
        }); 
        if(!isAuthorizeToPinned) throw new ForbiddenException("You don't have permission to edit this post.");
        
        // We need to check if post is actually pinned.
        const existingPinnedPost = await this.prisma.pinnedPost.findFirst({
          where: {
            userId: user.id,
            postId: id,
          },
        });
        if(existingPinnedPost) {
          return await this.prisma.pinnedPost.update({
            where: { id: existingPinnedPost.id},
            data: {
              deletedAt: existingPinnedPost.deletedAt === null ? new Date() : null
            }
          })
        } else {
          return  await this.prisma.pinnedPost.create({
            data: {
              userId: user.id,
              postId: id,
            },
          });
        }
      } else {
        throw new NotFoundException('Post not found');
      }   
    }
}
