import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PostProps } from "types/all";
import { CreatePostDto } from "./dto/CreatePost.dto";
import { toSlug } from "helpers/transformToSlug";


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

    // I list the method we will probably need
 
    // async findPostByUser(params: PostProps): Promise<PostProps[]> {
    //     // Maybe this method wont be necessary, the findAll with params should be enough?
    //     const { userId } = params;
    //     return this.prisma.post.findMany({
    //         where: {
    //             userId: userId
    //         },
    //         include: {
    //             user: true,
    //             comments: true,
    //             // tags: {
    //             //     include: {
    //             //         post: true,
    //             //         tag: true
    //             //     }
    //             // },
    //             postTypeChoice: {
    //                 include: {
    //                     content: true
    //                 }
    //             },
    //             likes: true
    //         }
    //     }); 
    // }


    async create(createPostDto: CreatePostDto) {
        const { description, userId, tags, postBody } = createPostDto;
        const tagsConnectOrCreate = tags.map(tag => ({
            where: { slug: toSlug(tag.name) },
            create: { slug: toSlug(tag.name), name: tag.name },
        }));

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

            // postTypeChoice: {
            //     create: {
            //       type: postTypeChoice,
            //       content: {
            //         create: {
            //           content
            //         },
            //       },
            //     },
            // },
            postTypeChoice: {
                create: postTypeChoiceCreate,
            },
          },
        });
    }
}
