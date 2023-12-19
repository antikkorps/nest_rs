// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateImageDto } from './dto/CreateImage.dto';
// import { UpdateImageDto } from './dto/UpdateImage.dto';

// @Injectable()
// export class ImageService {
//   constructor(public prisma: PrismaService) {}

//   async findAllOfUser(userId: number) {
//     return this.prisma.image.findMany({
//       where: { userId },
//     });
//   }

//   async create(createImageDto: CreateImageDto) {
//     return this.prisma.image.create({
//       data: createImageDto,
//     });
//   }

//   // Is userId === auth user?
//   async remove(id: number) {
//     return this.prisma.image.delete({
//       where: { id },
//     });
//   }

//   // Is userId === auth user?
//   async editImage(imageId: number, updateImageDto: UpdateImageDto) {
//     const image = await this.prisma.image.update({
//       where: { id: imageId },
//       data: { ...updateImageDto },
//     });
//     return image;
//   }
// }
