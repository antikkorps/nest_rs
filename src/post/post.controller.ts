import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VerifyRoles, jwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Controller('post')
export class PostController {
    constructor(public postService: PostService) {}

    @UseGuards(jwtGuard, new VerifyRoles('admin'))
    @Get()
    getTags() {
        return this.postService.findAll();
    }


    @UseGuards(jwtGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @UseGuards(jwtGuard)
    @Patch(':id')
    editSalon(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto) {
      const id = parseInt(postId, 10);
      return this.postService.editPost(id, updatePostDto);
    }

    @UseGuards(jwtGuard)
    @Get(':id')
    findOne(@Param('id') postId: string) {
        const id = parseInt(postId, 10);
      return this.postService.findOne(+id);
    }

    @UseGuards(jwtGuard)
    @Delete(':id')
    remove(@Param('id') postId: string) {
        const id = parseInt(postId, 10);
      return this.postService.remove(+id);
    }
}
