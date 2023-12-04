import { AuthService } from './auth.service';
import { AuthDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        email: string;
        createdAt: Date;
        id: number;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    validateUser(token: string): Promise<true>;
    resetPasswordRequest(email: string): Promise<string>;
}
