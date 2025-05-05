export class CreateUserDomainDto {
  email: string;
  passwordHash: string;
  login: string;
}

export class UpdateUserDto {
  email: string;
}
