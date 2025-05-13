import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../domain/post.enitity';
import { GetPostsQueryParams } from '../api/input-dto/get-posts-query-paramas.input.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostViewDto } from '../api/view-dto/post-view-dto';
import { SortDirection } from '../../../../core/dto/base.query-params.input-dto';
import { filter } from 'rxjs';
import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name)
    private PostModel: PostModelType,
  ) {}

  async getAll(
    query: GetPostsQueryParams,blogId?: string,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const { pageNumber, pageSize, sortBy, sortDirection } = query;
    const filter = blogId ? {blogId} : {}
    const result = await this.PostModel.find(filter)
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
    const post = await this.PostModel.findOne({_id: new mongoose.Types.ObjectId(id)})
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return PostViewDto.mapToView(post)
  }
  async getPostDocument (id: string) : Promise<PostDocument> {
    const post = await this.PostModel.findOne({_id: new mongoose.Types.ObjectId(id)})
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post as PostDocument;
  }
}
