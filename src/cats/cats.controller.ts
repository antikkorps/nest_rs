import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  //   @Get()
  //   findAll(): string {
  //     return 'This action returns all cats';
  //   }

  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}