import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../domain/post.enitity';
import { GetPostsQueryParams } from '../api/input-dto/get-posts-query-paramas.input.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostViewDto } from '../api/view-dto/post-view-dto';

export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name)
    private PostModel: PostModelType,
  ) {}
  async getAll(query:GetPostsQueryParams): Promise<PaginatedViewDto<PostViewDto[]>>
}
