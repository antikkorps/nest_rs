// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   UseGuards,
// } from '@nestjs/common';

// import { ImageService } from './image.service';
// import { jwtGuard } from 'src/auth/guard';
// import { UpdateImageDto } from './dto/UpdateImage.dto';
// import { CreateImageDto } from './dto/CreateImage.dto';

// @Controller('image')
// export class ImageController {
//   constructor(public imageService: ImageService) {}

//   @UseGuards(jwtGuard)
//   @Get(':userId')
//   findAllOfUser(@Param('userId') userId: string) {
//     return this.imageService.findAllOfUser(+userId);
//   }

//   // Create
//   @UseGuards(jwtGuard)
//   @Post()
//   create(@Body() createImageDto: CreateImageDto) {
//     return this.imageService.create(createImageDto);
//   }

//   @UseGuards(jwtGuard)
//   @Patch(':id')
//   editSalon(
//     @Param('id') imageId: string,
//     @Body() updateImageDto: UpdateImageDto,
//   ) {
//     const id = parseInt(imageId, 10);
//     return this.imageService.editImage(id, updateImageDto);
//   }

//   // Delete
//   @UseGuards(jwtGuard)
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.imageService.remove(+id);
//   }
// }
