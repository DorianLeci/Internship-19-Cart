import { RegisterRequestDto } from '@auth/dto/register-request.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ProfileResponseDto } from './dto/response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        address: true;
        card: true;
    };
}>;
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: RegisterRequestDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneByid(userId: string): Promise<UserWithRelations | null>;
    getProfile(userId: string): Promise<ProfileResponseDto>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto>;
}
