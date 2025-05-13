import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { GetPostsQueryParams } from './input-dto/get-posts-query-paramas.input.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostViewDto } from './view-dto/post-view-dto';
import { PostsQueryRepository } from '../infrastructure/posts.query-repository';
import { CreateAndUpdatePostDto } from './input-dto/post.create-update-dto';
import { PostsService } from '../application/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsQwRepository: PostsQueryRepository,
    private postsService: PostsService,
  ) {}

  @Get()
  async getAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQwRepository.getAll(query);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostViewDto> {
    return this.postsQwRepository.getPostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreateAndUpdatePostDto): Promise<PostViewDto> {
    const postId: string = await this.postsService.createPost(dto);
    return this.postsQwRepository.getPostById(postId);
  }
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(@Param('id') id:string, @Body() dto: CreateAndUpdatePostDto) {
    return await this.postsService.updatePost(id, dto);
  }
}
