import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Post, PostSchema } from './domain/post.enitity';


@Module({
  imports: [ MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsService , PostsRepository , PostsQueryRepository],
})

export class PostsModule {}