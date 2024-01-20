import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VerifyRoles, jwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { User } from 'helpers/getUser';
import { AuthUserProps } from 'types/all';

@Controller('post')
export class PostController {
  constructor(public postService: PostService) {}

  // @UseGuards(jwtGuard, new VerifyRoles('admin'))
  @Get()
  getPosts() {
    return this.postService.findAll();
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
  findOne(@Param('id') postId: string) {
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

  @Patch('/shared/:id')
  increaseSharing(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.increaseSharing(+id);
  }

  @Patch('/repost/:id')
  increaseRepost(@Param('id') postId: string) {
    const id = parseInt(postId, 10);
    return this.postService.increaseRepost(+id);
  }
}
