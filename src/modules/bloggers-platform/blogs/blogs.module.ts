import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './domain/blog.enitity';
import { BlogsController } from './api/blogs.controller';
import { BlogsService } from './application/blogs.service';
import { BlogsQueryRepository } from './infrastructure/blogs.query-repository';
import { BlogsRepository } from './infrastructure/blogs.repository';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    forwardRef(() => PostsModule)
  ],
  controllers: [BlogsController],
  providers: [BlogsService , BlogsRepository , BlogsQueryRepository],
  exports: [BlogsService , BlogsRepository , BlogsQueryRepository],
})

export class BlogsModule {}