import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from '../domain/blog.enitity';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { BlogViewDto } from '../api/view-dto/blogs-view-dto';
import { GetBlogsQueryParams } from '../api/input-dto/get-blogs-query-params.input.dto';
import { SortDirection } from '../../../../core/dto/base.query-params.input-dto';
import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';



export class BlogsQueryRepository {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType
  ) {}
  async getAll(query: GetBlogsQueryParams) : Promise<PaginatedViewDto<BlogViewDto[]>> {
const {pageNumber , pageSize , sortBy , sortDirection , searchNameTerm} = query
    let filter = {}
    if (searchNameTerm) {
      filter = { name : {$regex: searchNameTerm, $options: 'i' } };
    }
    const result = await this.BlogModel
      .find(filter)
      .sort({ [sortBy]: sortDirection === SortDirection.Asc ? 1 : -1 }) // nado eto delat' v mongoose? ili on takzhe ponimaet 'asc' 'desc'?
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean()
    const blogsCount = await this.BlogModel.countDocuments(filter);
    const items: BlogViewDto[] = result.map(BlogViewDto.mapToView);
    return PaginatedViewDto.mapToView({
      items,
      page: pageNumber,
      size: pageSize,
      totalCount: blogsCount,
    })
  }
  async getById (id: string) : Promise<BlogViewDto> {
    const blog = await this.BlogModel.findOne({_id: new mongoose.Types.ObjectId(id)})
    if (!blog) {
      throw new NotFoundException('user not found');
    }
    return BlogViewDto.mapToView(blog)
  }
}