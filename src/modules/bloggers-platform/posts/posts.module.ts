import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';


@Module({
  imports: [ MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsService , PostsRepository , PostsQueryRepository],
})

export class PostsModule {}