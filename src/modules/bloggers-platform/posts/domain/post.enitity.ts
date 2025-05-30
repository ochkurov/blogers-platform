import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ExtendedLikes,
  ExtendedLikesInfoSchema,
  LikeStatusEnum,
} from './extended.likes.schema';
import { HydratedDocument, Model } from 'mongoose';
import { CreateAndUpdatePostDto } from '../api/input-dto/post.create-update-dto';

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: String,
    required: true,
    maxlength: [30, 'Maximum length of title 30 symbols'],
  })
  title: string;
  @Prop({
    type: String,
    required: true,
    maxlength: [100, 'Maximum length of description 100 symbols'],
  })
  shortDescription: string;
  @Prop({
    type: String,
    required: true,
    maxlength: [1000, 'Maximum length of content 1000 symbols'],
  })
  content: string;
  @Prop({ type: String, required: true })
  blogId: string;
  @Prop({ type: String, required: true })
  blogName: string;
  createdAt: Date;
  updatedAt: Date;
  @Prop({ type: ExtendedLikesInfoSchema })
  extendedLikesInfo: ExtendedLikes;

  static createInstanse(dto: CreateAndUpdatePostDto , blogName: string): PostDocument {
    const post = new this();
    const likesInfo = new ExtendedLikes()
    post.extendedLikesInfo = likesInfo;
    post.title = dto.title;
    post.shortDescription = dto.shortDescription;
    post.content = dto.content;
    post.blogId = dto.blogId;
    post.blogName = blogName;
    post.extendedLikesInfo.likesCount = 0;
    post.extendedLikesInfo.dislikesCount = 0;
    post.extendedLikesInfo.myStatus = LikeStatusEnum.None;
    post.extendedLikesInfo.newestLikes = [];

    return post as PostDocument;
  }

  updatePost(dto: CreateAndUpdatePostDto) {
    this.title = dto.title;
    this.shortDescription = dto.shortDescription;
    this.content = dto.content;
    this.blogId = dto.blogId;
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);

export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;
