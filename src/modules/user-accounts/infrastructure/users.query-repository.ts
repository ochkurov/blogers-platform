import { User, UserModelType } from '../domain/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserViewDto } from '../api/view-dto/users.view-dto';
import { NotFoundException } from '@nestjs/common';
import { GetUsersQueryParams } from '../api/input-dto/get-users-query-params.input.dto';
import { PaginatedViewDto } from '../../../core/dto/base.paginated.view-dto';

export class UsersQueryRepository {
  constructor(
    @InjectModel(User.name)
    private UserModel: UserModelType,
  ) {}

  async getByIdOrNotFoundFail(id: string): Promise<UserViewDto> {
    const user = await this.UserModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return UserViewDto.mapToView(user);
  }

  //TODO: add pagination and filters
  async getAll(
    query: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    const result = await this.UserModel.find().exec();

    return result.map((user) => UserViewDto.mapToView(user));
  }
}
