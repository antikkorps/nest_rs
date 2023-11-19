import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
export declare class AnnoncesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createAnnonceDto: CreateAnnonceDto): Promise<{
        id: number;
        title: string;
        description: string;
        brand: string;
        price: number;
        kilometrage: number;
        yearofcirculation: number;
        published: boolean;
        featured: boolean;
        imageCover: string;
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        description: string;
        brand: string;
        price: number;
        kilometrage: number;
        yearofcirculation: number;
        published: boolean;
        featured: boolean;
        imageCover: string;
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
    }[]>;
    findQuery(query: any): Promise<{
        id: number;
        title: string;
        description: string;
        brand: string;
        price: number;
        kilometrage: number;
        yearofcirculation: number;
        published: boolean;
        featured: boolean;
        imageCover: string;
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        brand: string;
        price: number;
        kilometrage: number;
        yearofcirculation: number;
        published: boolean;
        featured: boolean;
        imageCover: string;
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
    }>;
    update(id: number, updateAnnonceDto: UpdateAnnonceDto): Promise<{
        id: number;
        title: string;
        description: string;
        brand: string;
        price: number;
        kilometrage: number;
        yearofcirculation: number;
        published: boolean;
        featured: boolean;
        imageCover: string;
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
    }>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AnnonceClient<{
        id: number;
        title: string;
        description: string;
        brand: string;
        price: number;
        kilometrage: number;
        yearofcirculation: number;
        published: boolean;
        featured: boolean;
        imageCover: string;
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}