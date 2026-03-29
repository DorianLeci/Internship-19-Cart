export interface UserAddressResponseDto {
  street: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface UserCardResponseDto {
  expiryMonth: number;
  expiryYear: number;
  iban: string;
  cvc: string;
}

export interface ProfileResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  address: UserAddressResponseDto;
  card: UserCardResponseDto;
}