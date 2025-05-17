import { BaseQueryParams } from '../../../../../core/dto/base.query-params.input-dto';
import { PostSortBy } from './post-sort-by';
import { IsEnum, IsOptional } from 'class-validator';

export class GetPostsQueryParams extends BaseQueryParams {
  @IsOptional()
  sortBy:PostSortBy  = PostSortBy.CreatedAt ;
}