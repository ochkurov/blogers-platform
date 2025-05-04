import { UserSortBy } from './user-sort-by';
import { BaseQueryParams } from '../../../../core/dto/base.query-params.input-dto';

export class GetUsersQueryParams extends BaseQueryParams {
  sortBy: UserSortBy = UserSortBy.CreatedAt;
  searchLoginTerm: string | null = null;
  searchEmailTerm: string | null = null;
}
