import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(userId: number, dto: EditUserDto): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
    getAllUsers(): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }[]>;
    getUserById(userId: number): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
    deleteUser(userId: number): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
}
