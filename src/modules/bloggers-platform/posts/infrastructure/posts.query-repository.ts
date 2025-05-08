import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../domain/post.enitity';
import { GetPostsQueryParams } from '../api/input-dto/get-posts-query-paramas.input.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostViewDto } from '../api/view-dto/post-view-dto';
import { SortDirection } from '../../../../core/dto/base.query-params.input-dto';
import { filter } from 'rxjs';

export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name)
    private PostModel: PostModelType,
  ) {}

  async getAll(
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const { pageNumber, pageSize, sortBy, sortDirection } = query;
    const result = await this.PostModel.find({})
      .sort({ [sortBy]: sortDirection === SortDirection.Asc ? 1 : -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();
    const postsCount = await this.PostModel.countDocuments({});
    const posts: PostViewDto[] = result.map(PostViewDto.mapToView);
   return PaginatedViewDto.mapToView({
      items: posts,
      page: pageNumber,
      size: pageSize,
      totalCount: postsCount,
    });
  }
  async getPostById (id: string) : Promise<PostViewDto> {
    return
  }
}
