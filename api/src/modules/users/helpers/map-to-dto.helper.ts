import { UserWithRelations } from '@tstypes/user';

const mapToDto = (user: UserWithRelations) => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl ?? undefined,
    address: user.address!,
    card: user.card!,
  };
};

export default mapToDto;
