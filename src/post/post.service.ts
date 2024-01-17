import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PostProps } from "types/all";
import { CreatePostDto } from "./dto/CreatePost.dto";
import { toSlug } from "helpers/transformToSlug";
import { UpdatePostDto } from "./dto/UpdatePost.dto";
import { isOwner, isOwnerOrSuperAdmin, isSuperAdmin } from "policies/isAdminOrOwner";


@Injectable()
export class PostService {
    constructor(public prisma: PrismaService) {}

    // In this method we will use the params : pagination, search (user, tag), orbderBy (view, share, likes, comments)
    async findAll() {
        return this.prisma.post.findMany({
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
    }

    async findOne(id: number) {
        return this.prisma.post.findUnique({
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
    }

    async remove(id: number) {

        await this.prisma.postTag.deleteMany({ where: { postId: id } });
        await this.prisma.postTypeChoice.deleteMany({ where: { postId: id } });

        return this.prisma.post.delete({
          where: { id },
        });
    }

    async create(createPostDto: CreatePostDto) {
        const { description, userId, tags, postBody } = createPostDto;
        
        // Create or connect the tags to the actual post.
        const tagsConnectOrCreate = tags.map(tag => ({
            where: { slug: toSlug(tag.name) },
            create: { slug: toSlug(tag.name), name: tag.name },
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
            likedItemId: 1,
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

    async editPost(postId: number, updatePostDto: UpdatePostDto, user) {
        const { description, userId, tags, postBody } = updatePostDto;

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
            where: { slug: toSlug(tag.name) },
            create: { slug: toSlug(tag.name), name: tag.name },
        }));

        // Create the postBody 
        const postTypeChoiceCreate = postBody.map(body => ({
            type: body.postTypeChoice,
            content: {
                create: body.postContent.map(content => ({
                    content: content.content,
                })),
            },
        }));


        const updatedPost = await this.prisma.post.update({
            where: { id: postId},
            data: {
                description,
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
        return this.prisma.post.findMany({
            where: {
                userId: id
            },
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
    }
}
