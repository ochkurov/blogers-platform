import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from '../domain/blog.enitity';
import { BlogsRepository } from '../infrastructure/blogs.repository';
import { CreateBlogInputDto } from '../api/input-dto/create-blog.update.dto';
import { BlogsQueryRepository } from '../infrastructure/blogs.query-repository';

export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    private blogsReposotory: BlogsRepository
  ) {}

  async createBlog(dto: CreateBlogInputDto): Promise<string> {
    const blog = this.BlogModel.createInstanse(dto);
    await this.blogsReposotory.save(blog);
    return blog._id.toString();
  }
  async updateBlog (id: string , body: CreateBlogInputDto) {
    const blog = await this.blogsReposotory.getByIdBlogDocument(id);
    blog.update(body)
    await this.blogsReposotory.save(blog);
  }
  async deleteBlog (id: string) {
    const blog = await this.blogsReposotory.getByIdBlogDocument(id);
    return await this.blogsReposotory.deleteBlog(id)
  }
}
