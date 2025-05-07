import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument, BlogModelType } from '../domain/blog.enitity';
import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class BlogsRepository {
  constructor(@InjectModel(Blog.name)
              private BlogModel: BlogModelType) {
  }
  async getByIdBlogDocument(id: string): Promise<BlogDocument> {
    const blog = await this.BlogModel.findOne({_id: new mongoose.Types.ObjectId(id)});
    if (!blog) {
      //TODO: replace with domain exception - chto eto znachit?
      throw new NotFoundException('blog not found');
    }
    return blog

  }
  async save (blog: BlogDocument) {
    await blog.save();
  }
  async deleteBlog (id: string): Promise<void> {
     await this.BlogModel.deleteOne({_id: new mongoose.Types.ObjectId(id) })
  }
}