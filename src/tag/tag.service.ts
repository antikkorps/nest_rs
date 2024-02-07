import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/CreateTag.dto';
import { UpdateTagDto } from './dto/UpdateTag.dto';
import { toSlug } from 'helpers/transformToSlug';

@Injectable()
export class TagService {
  constructor(public prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(name: string) {
    return this.prisma.tag.findUnique({
      where: { name },
    });
  }

  async create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({
      data: {
        name: createTagDto.name,
      },
    });
  }

  async remove(name: string) {
    return this.prisma.tag.delete({
      where: { name },
    });
  }

  async editTag(tagId: number, updateTagDto: UpdateTagDto) {
    const tag = await this.prisma.tag.update({
      where: { id: tagId },
      data: { ...updateTagDto },
    });
    return tag;
  }
}
