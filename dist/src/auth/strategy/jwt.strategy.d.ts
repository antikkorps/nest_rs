import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
        roles: string;
    }): Promise<{
        roles: {
            userId: number;
            roleSlug: string;
            assignedAt: Date;
            assignedBy: string;
        }[];
    } & {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        webpage: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
}
export {};
