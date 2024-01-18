import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { VerifyRoles, jwtGuard } from 'src/auth/guard';
import { CreateTagDto } from './dto/CreateTag.dto';
import { UpdateTagDto } from './dto/UpdateTag.dto';

@Controller('tag')
export class TagController {
    constructor(public tagService: TagService) {}

    @UseGuards(jwtGuard, new VerifyRoles('admin'))
    @Get()
    getTags() {
        return this.tagService.findAll();
    }

    @UseGuards(jwtGuard)
    @Get(':name')
    findOne(@Param('name') name: string) {
      return this.tagService.findOne(name);
    }

    @UseGuards(jwtGuard)
    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @UseGuards(jwtGuard)
    @Patch(':id')
    editSalon(@Param('id') tagId: string, @Body() updateTagDto: UpdateTagDto) {
      const id = parseInt(tagId, 10);
      return this.tagService.editTag(id, updateTagDto);
    }

    @UseGuards(jwtGuard)
    @Delete(':name')
    remove(@Param('name') name: string) {
      return this.tagService.remove(name);
    }
}
