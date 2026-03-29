import { ProfileResponseDto } from '@cart-app/types';
import { UserWithRelations } from '@users/users.service';
declare const mapToDto: (user: UserWithRelations) => ProfileResponseDto;
export default mapToDto;
