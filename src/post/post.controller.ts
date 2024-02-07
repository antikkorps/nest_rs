import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VerifyRoles, jwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { User } from 'helpers/getUser';
import { AuthUserProps, PostProps } from 'types/all';
import { SearchPostDto } from './dto/SearchPost.dto';
import { CreateCommentDto } from './dto/commentsDTO/CreateComment.dto';

@Controller('post')
export class PostController {
  constructor(public postService: PostService) {}

  // @UseGuards(jwtGuard, new VerifyRoles('admin'))
  @Get()
  getPosts(@Query() query: SearchPostDto): Promise<PostProps[]> {
    return this.postService.findAll(query);
  }

  @UseGuards(jwtGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @UseGuards(jwtGuard)
  @Patch(':id')
  editPost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: AuthUserProps,
  ) {
    const id = parseInt(postId, 10);
    return this.postService.editPost(id, updatePostDto, user);
  }

  @UseGuards(jwtGuard)
  @Get(':id')
  findOne(@Param('id') postId: string): Promise<PostProps> {
    const id = parseInt(postId, 10);
    return this.postService.findOne(+id);
  }

  @UseGuards(jwtGuard)
  @Delete(':id')
  remove(@Param('id') postId: string, @User() user: AuthUserProps) {
    const id = parseInt(postId, 10);
    return this.postService.remove(+id, user);
  }

  @UseGuards(jwtGuard)
  @Get('/user/:id')
  findByUser(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.findByUser(+id);
  }

  @Patch('/views/:id')
  increaseView(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.increaseView(+id);
  }

  @UseGuards(jwtGuard)
  @Patch('/shared/:id')
  increaseSharing(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.increaseSharing(+id);
  }

  @UseGuards(jwtGuard)
  @Patch('/repost/:id')
  increaseRepost(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.increaseRepost(+id);
  }

  @UseGuards(jwtGuard)
  @Patch('/pinned/:id')
  addPinnedPost(@Param('id') postId: string, @User() user: AuthUserProps) {
    const id = parseInt(postId, 10);
    return this.postService.addPinnedPost(+id, user);
  }

  @UseGuards(jwtGuard)
  @Post('/:id/comment')
  createComment(
    @Param('id') postId: string,
    @User() user: AuthUserProps,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const id = parseInt(postId, 10);
    return this.postService.createComment(+id, user, createCommentDto);
  }

  // @UseGuards(jwtGuard)
  @Get('/comment/:id')
  getComment(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.getComment(+id);
  }

  @UseGuards(jwtGuard)
  @Post('/savePost/:id')
  savePost(@Param('id') postId: string, @User() user: AuthUserProps) {
    const id = parseInt(postId, 10);
    return this.postService.savePost(+id, user);
  }
}
