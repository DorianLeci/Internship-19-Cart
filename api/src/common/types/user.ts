import { Address, User, UserCard } from '@prisma/client';

export type UserWithRelations = User & { address: Address | null; card: UserCard | null };
