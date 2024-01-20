import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { jwtGuard } from 'src/auth/guard';
import { CreateLikeDto } from './dto/CreateLike.dto';
import { User } from 'helpers/getUser';
import { AuthUserProps } from 'types/all';

@Controller('like')
export class LikeController {
    constructor(public likeService: LikeService) {}

    @UseGuards(jwtGuard)
    @Post()
    create(@Body() createLikeDto: CreateLikeDto,  @User() user: AuthUserProps) {
      return this.likeService.create(createLikeDto, user);
    }
}
