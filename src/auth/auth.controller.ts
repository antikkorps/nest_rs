import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, PasswordResetDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // console.log({
    //   dto,
    // });
    return this.authService.signup(dto);
  }

  // @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.signin(dto, response);
  }

  @Get('validate/:token')
  async validateUser(@Param('token') token: string) {
    if (!token) {
      throw new ForbiddenException('Token not provided');
    } else {
      try {
        const user = await this.authService.validateUser(token);
        if (!user) {
          throw new ForbiddenException('Invalid token');
        }
        return user;
      } catch (error) {
        throw new ForbiddenException('Invalid token');
      }
    }
  }

  @Post('reset-password-request')
  resetPasswordRequest(@Body('email') email: string) {
    return this.authService.resetPasswordRequest(email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: PasswordResetDto) {
    return this.authService.resetPassword(dto);
  }
}
