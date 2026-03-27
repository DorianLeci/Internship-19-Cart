import { RegisterRequestDto } from '@auth/dto/register-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Address, User, UserCard } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

type UserWithRelations = User & { address: Address | null; card: UserCard | null };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: RegisterRequestDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: {
          create: user.address,
        },
        card: {
          create: user.card,
        },
      },
      include: {
        address: true,
        card: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneByid(userId: string): Promise<UserWithRelations | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: true,
        card: true,
      },
    });
  }

  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const user = await this.findOneByid(userId);

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl ?? undefined,
      address: user.address!,
      card: user.card!,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    const { address, card, ...otherFields } = dto;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...otherFields,
        address: address ? { update: address } : undefined,
        card: card ? { update: card } : undefined,
      },
      include: {
        address: true,
        card: true,
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      avatarUrl: updatedUser.avatarUrl ?? undefined,
      address: updatedUser.address!,
      card: updatedUser.card!,
    };
  }
}
