import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { Post, PostSchema } from './domain/post.enitity';
import { PostsController } from './api/posts.controller';
import { PostsService } from './application/posts.service';
import { PostsRepository } from './infrastructure/posts.repository';
import { PostsQueryRepository } from './infrastructure/posts.query-repository';
import { BlogsRepository } from '../blogs/infrastructure/blogs.repository';
import { BlogsModule } from '../blogs/blogs.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => BlogsModule)
  ],
  controllers: [PostsController],
  providers: [PostsService ,PostsRepository , PostsQueryRepository],
  exports: [PostsService ,PostsRepository , PostsQueryRepository],
})

export class PostsModule {}