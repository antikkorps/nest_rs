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
import { CreateCommentDto } from './dto/commentsDTO/CreateComment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(public prisma: PrismaService) {}

  //  I need to add the tag on the search params.
  async findAll(query: SearchPostDto) {
    // Add to the findAll a system to retrieve post with user_status and modo_status
    let orderByClause: any = {};
    const orderByWhat = query.orderByWhat; // ça peut être views / repost
    const orderBy = query.orderBy;

    const tagsString = query.tags;
    let tagsArray = [];
    if (tagsString) {
      tagsArray = tagsString.split(',');
    }

    if (!orderByWhat || !orderBy) {
      orderByClause = { createdAt: 'desc' };
    } else if (
      ['views', 'repost', 'shared', 'createdAt', 'updatedAt'].includes(
        orderByWhat,
      )
    ) {
      orderByClause = { [orderByWhat]: orderBy };
    } else if (['likes, comments']) {
      orderByClause = {
        [orderByWhat]: {
          _count: orderBy,
        },
      };
    }

    const currentPage = Math.max(Number(query.page || 1), 1);
    const perPage = query.perPage ? Number(query.perPage) : 10;
    const paginateOptions = {
      take: perPage,
      skip: query.page ? (currentPage - 1) * perPage : 0,
    };

    const currentCommentPage = Math.max(Number(1), 1);
    const paginateCommentOptions = {
      take: 2,
      skip: query.page ? (currentCommentPage - 1) * perPage : 0,
    };
    const posts = this.prisma.post.findMany({
      orderBy: [orderByClause],
      ...paginateOptions,
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            parentId: null,
          },
          ...paginateCommentOptions,
          select: COMMENT_SELECT_FIELDS,
        },
        tags: true,
        postTypeChoice: {
          include: {
            content: true,
          },
        },
        likes: true,
        _count: {
          select: { comments: true },
        },
      },
      where: {
        ...(tagsArray.length > 0 && {
          tags: {
            some: {
              tagName: {
                in: tagsArray,
              },
            },
          },
        }),
      },
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        tags: true,
        postTypeChoice: {
          include: {
            content: true,
          },
        },
        likes: true,
      },
    });

    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async remove(id: number, user: AuthUserProps) {
    const postToDelete = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!postToDelete) throw new NotFoundException('Post not found');

    const isAuthorizeToUpdate = await isOwnerOrSuperAdmin({
      ownerId: postToDelete.userId,
      user: user,
    });
    if (!isAuthorizeToUpdate)
      throw new ForbiddenException(
        "You don't have permission to edit this post.",
      );

    await this.prisma.postTag.deleteMany({ where: { postId: id } });
    await this.prisma.postTypeChoice.deleteMany({ where: { postId: id } });
    await this.prisma.pinnedPost.deleteMany({ where: { postId: id } });
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async create(createPostDto: CreatePostDto) {
    const { description, userId, tags, postBody, user_status } = createPostDto;
    // Create or connect the tags to the actual post.
    const tagsConnectOrCreate = tags.map((tag) => ({
      where: { name: tag.name },
      create: { name: tag.name },
    }));
    const postTypeChoiceCreate = postBody.map((body) => ({
      type: body.postTypeChoice,
      content: {
        create: body.postContent.map((content) => ({
          content: content.content,
        })),
      },
    }));

    return this.prisma.post.create({
      data: {
        description,
        user_status,
        user: {
          connect: { id: userId },
        },

        tags: {
          create: tagsConnectOrCreate.map((tag) => ({
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

  async editPost(
    postId: number,
    updatePostDto: UpdatePostDto,
    user: AuthUserProps,
  ) {
    const { description, userId, tags, postBody, user_status } = updatePostDto;
    const postToUpdate = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postToUpdate) throw new NotFoundException('Post not found');

    // Check if the User can do this action
    const isAuthorizeToUpdate = await isOwnerOrSuperAdmin({
      ownerId: postToUpdate.userId,
      user: user,
    });
    if (!isAuthorizeToUpdate)
      throw new ForbiddenException(
        "You don't have permission to edit this post.",
      );

    // I think we must delete the pivot entry and replace by the new, even they're the same
    await this.prisma.postTag.deleteMany({ where: { postId } });
    await this.prisma.postTypeChoice.deleteMany({ where: { postId } });

    // Start to createOrconnect the new tags
    const tagsConnectOrCreate = tags.map((tag) => ({
      where: { name: tag.name },
      create: { name: tag.name },
    }));

    // Create the postBody
    const postTypeChoiceCreate = postBody.map((body) => ({
      type: body.postTypeChoice,
      content: {
        create: body.postContent.map((content) => ({
          content: content.content,
        })),
      },
    }));

    const updatedPost = await this.prisma.post.update({
      where: { id: postId },
      data: {
        description,
        user_status,
        tags: {
          create: tagsConnectOrCreate.map((tag) => ({
            tag: {
              connectOrCreate: tag,
            },
          })),
        },
        postTypeChoice: {
          create: postTypeChoiceCreate,
        },
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: COMMENT_SELECT_FIELDS,
        },
        tags: true,
        postTypeChoice: {
          include: {
            content: true,
          },
        },
        likes: true,
      },
    });

    return updatedPost;
  }

  async findByUser(id: number) {
    // Add the same comments system than the findAll
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');
    const posts = await this.prisma.post.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: COMMENT_SELECT_FIELDS,
        },
        tags: true,
        postTypeChoice: {
          include: {
            content: true,
          },
        },
        likes: true,
      },
    });

    if (posts.length === 0) throw new NotFoundException('No posts found');

    return posts;
  }

  async increaseView(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (post) {
      const currentViews = post.views || 0;
      const newViews = Number(currentViews) + 1;
      return await this.prisma.post.update({
        where: { id },
        data: {
          views: newViews,
        },
      });
    } else {
      throw new NotFoundException('Post not found');
    }
  }

  async increaseSharing(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (post) {
      const currentSharing = post.shared || 0;
      const newSharing = Number(currentSharing) + 1;
      return await this.prisma.post.update({
        where: { id },
        data: {
          shared: newSharing,
        },
      });
    } else {
      throw new NotFoundException('Post not found');
    }
  }

  async increaseRepost(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (post) {
      const currentRepost = post.repost || 0;
      const newRepost = Number(currentRepost) + 1;
      return await this.prisma.post.update({
        where: { id },
        data: {
          repost: newRepost,
        },
      });
    } else {
      throw new NotFoundException('Post not found');
    }
  }

  async addPinnedPost(id: number, user: AuthUserProps) {
    // I added the where userId verification, then the isAuthorizeToPinned is not 100% usefull I think cause the 404 will be triggered before the authorization...
    // But for now I maybe let a failure, so more security is better
    const post = await this.prisma.post.findUnique({
      where: { id: id, userId: user.id },
    });
    if (post) {
      const isAuthorizeToPinned = await isOwnerOrSuperAdmin({
        ownerId: post.userId,
        user: user,
      });
      if (!isAuthorizeToPinned)
        throw new ForbiddenException(
          "You don't have permission to edit this post.",
        );

      // We need to check if post is actually pinned.
      const existingPinnedPost = await this.prisma.pinnedPost.findFirst({
        where: {
          userId: user.id,
          postId: id,
        },
      });
      if (existingPinnedPost) {
        return await this.prisma.pinnedPost.update({
          where: { id: existingPinnedPost.id },
          data: {
            deletedAt:
              existingPinnedPost.deletedAt === null ? new Date() : null,
          },
        });
      } else {
        return await this.prisma.pinnedPost.create({
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

  async savePost(id: number, user: AuthUserProps) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException('Post not found');

    const existingSavedPost = await this.prisma.savedPost.findFirst({
      where: {
        userId: user.id,
        postId: id,
      },
    });
    if (existingSavedPost) {
      return await this.prisma.savedPost.delete({
        where: { id: existingSavedPost.id },
      });
    } else {
      return await this.prisma.savedPost.create({
        data: {
          userId: user.id,
          postId: id,
        },
      });
    }
  }

  async createComment(
    id: number,
    user: AuthUserProps,
    createCommentDto: CreateCommentDto,
  ) {
    const { description, parentId } = createCommentDto;

    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException('Post not found');

    const comment = await this.prisma.comment.create({
      data: {
        description: description,
        userId: user.id,
        parentId: parentId,
        postId: id,
      },
      select: COMMENT_SELECT_FIELDS,
    });
    return comment;
  }

  async getComment(id: number) {
    // I start checking if the post exist
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException('Post not found');

    // Then I take the x last roots comment
    // We need to implement here all the dynamic part of the cursor pagination, Cursor is missing here

    // We can add too, an order by like count for example.
    const rootComment = await this.prisma.comment.findMany({
      take: 10,
      // skip: 1,
      where: {
        postId: id,
        parentId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const postIdArray = rootComment.map((comment) => comment.id);

    // Now we get the children of the root comment.
    // I let some comments here -> it was my first request, when I only used one request to get parent and child. Now i try with one fct to get parent, and this query to retrieve child.
    const getChildren = await this.prisma.$queryRaw<any[]>`
      WITH RECURSIVE comments_with_children (id, description, "postId", "parentId", "userId", "createdAt", level) AS (
        SELECT
          id,
          description,
          "postId",
          "parentId",
          "userId",
          "createdAt",
          0
        FROM comments
        -- WHERE "postId" = ${post.id}
        WHERE "id" = ANY (${postIdArray})
        -- AND "parentId" IS NULL
        UNION ALL
        SELECT
          c.id,
          c.description,
          c."postId",
          c."parentId",
          c."userId",
          c."createdAt",
          comments_with_children.level + 1
        FROM comments c, comments_with_children
        WHERE c."parentId" = comments_with_children.id
      )
      SELECT id, description, "postId", "parentId", "userId", "createdAt", level
      FROM comments_with_children
      ORDER BY "createdAt" DESC;
    `;

    const comments = getChildren.map((comment) => ({
      ...comment,
      children: [],
    }));

    // Create a dictionnary to get all the comment Id
    const commentDictionary = {};
    comments.forEach((comment) => {
      commentDictionary[comment.id] = comment;
    });

    // Add the response to the parent
    comments.forEach((comment) => {
      const parentId = comment.parentId;
      if (parentId && commentDictionary[parentId]) {
        commentDictionary[parentId].children.push(comment);
      }
    });

    // Filter the parentId null comments.
    const getComments = comments.filter((comment) => !comment.parentId);
    return getComments;
  }
}

const COMMENT_SELECT_FIELDS = {
  id: true,
  description: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      lastName: true,
    },
  },
};
