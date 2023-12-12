import { UserService } from './user.service';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User, email: string, role: string): {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    };
    getAllUsers(): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    })[]>;
    getUserById(userId: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
    editUser(userId: string, dto: EditUserDto): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
    deleteUser(userId: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        resetToken: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string;
        birth: Date;
        sex: string;
    }>;
}
