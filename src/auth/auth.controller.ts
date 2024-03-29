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
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, PasswordResetDto } from './dto';
import { jwtGuard } from './guard';
import { User } from 'helpers/getUser';
import { AuthUserProps } from 'types/all';

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

  @Post('forgotten-password')
  async forgottenPassword(@Body('email') email: string) {
    const response = await this.authService.forgottenPassword(email);
    return response;
  }

  @Post('reset-password')
  resetPassword(@Body() dto: PasswordResetDto) {
    return this.authService.resetPassword(dto);
  }


  @Post('resend-confirmation-mail-link')
  async resendConfirmationLink(@Body('email') email:string) {
    const response = await this.authService.resendConfirmationLink(email);
    return response;
  }

  @Post('confirm-email-check-token')
  async checkConfirmationMailToken(@Body('token') token:string) {
    const response = await this.authService.checkConfirmationMailToken(token);
    return response;
  }
}


