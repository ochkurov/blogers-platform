import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CreateBlogInputDto,
  UpdateBlogDto,
} from '../api/input-dto/create-blog.update.dto';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })

export class Blog {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, required: true })
  websiteUrl: string;
  @Prop({ type: Boolean })
  isMembership: boolean;

  createdAt: Date;
  updatedAt: Date;

  static createInstanse(dto: CreateBlogInputDto): BlogDocument {
    const blog = new this();
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    blog.isMembership = true;
    return blog as BlogDocument;
  }

  update(dto: UpdateBlogDto) {
    this.name = dto.name;
    this.description = dto.description;
    this.websiteUrl = dto.websiteUrl;
  }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.loadClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument> & typeof Blog;
