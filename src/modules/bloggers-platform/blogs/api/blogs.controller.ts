import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetBlogsQueryParams } from './input-dto/get-blogs-query-params.input.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { BlogViewDto } from './view-dto/blogs-view-dto';
import { BlogsQueryRepository } from '../infrastructure/blogs.query-repository';
import { CreateBlogInputDto } from './input-dto/create-blog.update.dto';
import { BlogsService } from '../application/blogs.service';
import { PostViewDto } from '../../posts/api/view-dto/post-view-dto';
import { GetPostsQueryParams } from '../../posts/api/input-dto/get-posts-query-paramas.input.dto';
import { PostsQueryRepository } from '../../posts/infrastructure/posts.query-repository';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsQueryRepository: BlogsQueryRepository,
    private blogService: BlogsService,
    private postsQwRepository: PostsQueryRepository
  ) {}

  @Get()
  async getAll(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAll(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BlogViewDto> {
    return this.blogsQueryRepository.getById(id);
  }

  @Get(':blogId/posts')
  async getPostsByBlogId(
    @Param('blogId') blogId: string,
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQwRepository.getAll(query , blogId);
  }

  @Post()
  async createBlog(@Body() body: CreateBlogInputDto): Promise<BlogViewDto> {
    const blogId = await this.blogService.createBlog(body);
    return await this.blogsQueryRepository.getById(blogId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlog(@Param('id') id: string, @Body() body: CreateBlogInputDto) {
    return await this.blogService.updateBlog(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param('id') id: string) {
    return await this.blogService.deleteBlog(id);
  }
}
