import { Controller, Get, Query } from '@nestjs/common';
import { GetPostsQueryParams } from './input-dto/get-posts-query-paramas.input.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostViewDto } from './view-dto/post-view-dto';
import { PostsQueryRepository } from '../infrastructure/posts.query-repository';

@Controller('posts')
export class PostsController {
  constructor(
    private postsQwRepository:PostsQueryRepository
  ) {
  }
  @Get()
  getAll(
    @Query() query:GetPostsQueryParams
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
return this.postsQwRepository
  }
}