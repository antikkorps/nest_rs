import { UserService } from './user.service';
import {
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { jwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/';
import { EditUserDto } from './dto';

// @UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // endpoint users/me
  @Get('me')
  getMe(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetUser('role') role: string,
  ) {
    console.log({ email });
    console.log({ role });
    return user;
  }
  // endpoint users/all
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  // endpoint users/id
  @Get(':id')
  getUserById(@Param('id') userId: string) {
    const id = parseInt(userId, 10);
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  editUser(@Param('id') userId: string, @Body() dto: EditUserDto) {
    const id = parseInt(userId, 10);
    return this.userService.editUser(id, dto);
  }
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    const id = parseInt(userId, 10);
    return this.userService.deleteUser(id);
  }
}
