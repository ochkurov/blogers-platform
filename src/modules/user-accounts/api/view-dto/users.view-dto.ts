export class UsersViewDto {
  id:string,
  login:string,
  email:string,
  createdAt: Date,
  firstName:string,
  lastName:string | null,
  static mapToView (user:UserDocument): UsersViewDto {
    const dto = new UsersViewDto();
    dto.id = user._id.toString();
    dto.login = user.login;
    dto.email = user.email;
    dto.createdAt = user.createdAt;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;

    return dto;
  }
}