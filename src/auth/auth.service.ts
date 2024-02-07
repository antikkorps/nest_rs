import {
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { createUserPseudo } from 'helpers/createUserPseudo';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // Generate the password hash

    const checkMail = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (checkMail) {
      throw new ForbiddenException('Cet email est déjà enregistré');
    }
    const password = await argon.hash(dto.password);
    // Save the new user in the db
    let pseudo: string;
    let checkPseudo: any;
    do {
      pseudo = createUserPseudo();
      checkPseudo = await this.prisma.user.findUnique({
        where: {
          pseudo: pseudo,
        },
      });
    } while (checkPseudo);

    // return pseudo;
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          pseudo,
          roles: {
            create: [
              {
                assignedBy: 'Default',
                roleSlug: 'guest',
              },
            ],
          },
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      //return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Cet email est déjà enregistré');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto, response: any) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        roles: true,
      },
    });
    //if user does not exist throw exception
    if (!user)
      throw new ForbiddenException('Utilisateur et/ou mot de passe incorrects');
    //compare password
    const passwordMatches = await argon.verify(user.password, dto.password);
    //if password incorrect, throw an exception

    // Get the user roles
    const userRoles = user.roles.map((role) => role.roleSlug.toString());
    // Join it in one strnig
    const concatenatedRoles = userRoles.join(',');

    if (!passwordMatches)
      throw new ForbiddenException('Utilisateur et/ou mot de passe incorrects');

    const { access_token } = await this.signToken(
      user.id,
      user.email,
      concatenatedRoles,
    );

    response.cookie(process.env.SESSION_COOKIE, access_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      domain: 'localhost',
    });
    return { access_token };

    // return this.signToken(user.id, user.email, concatenatedRoles);
  }
  async signToken(
    userId: number,
    email: string,
    roles: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      roles,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return { access_token: token };
  }
  async validateUser(token: string): Promise<boolean> {
    try {
      const secret = this.config.get('JWT_SECRET');
      const decodedToken = await this.jwt.verifyAsync(token, {
        secret: secret,
      });
      return decodedToken;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
  async resetPasswordRequest(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException("L'email n'a pas été trouvé");
      }
      const secret = this.config.get('JWT_SECRET');
      const payload = { userId: user.id };
      const resetToken = await this.jwt.signAsync(payload, {
        secret: secret,
        expiresIn: '1h',
      });
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetToken,
        },
      });
      return resetToken;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  async validateResetToken(token: string): Promise<number> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          resetToken: token,
        },
      });
      if (!user) {
        throw new NotFoundException('Token not found');
      }
      return user.id;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
