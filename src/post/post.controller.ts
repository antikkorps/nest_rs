import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VerifyRoles, jwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';

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
}
