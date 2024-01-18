import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTagDto } from "./dto/CreateTag.dto";
import { UpdateTagDto } from "./dto/UpdateTag.dto";
import { toSlug } from "helpers/transformToSlug";

@Injectable()
export class TagService {
    constructor(public prisma: PrismaService) {}

    async findAll() {
        return this.prisma.tag.findMany(); 
    }

    async findOne(slug: string) {
        return this.prisma.tag.findUnique({
          where: { slug },
        });
    }

    async create(createTagDto: CreateTagDto) {
      const slug = toSlug(createTagDto.name)
      return this.prisma.tag.create({
          data: {
            name: createTagDto.name,
            slug: slug
          },
        });
    }

    async remove(slug: string) {
        return this.prisma.tag.delete({
          where: { slug },
        });
    }
    
    async editTag(tagId: number, updateTagDto: UpdateTagDto) {
        const slug = toSlug(updateTagDto.name)
        const tag = await this.prisma.tag.update({
          where: { id: tagId },
          data: {
              ...updateTagDto,
              slug: slug,
          },
        });
        return tag;
      }
}