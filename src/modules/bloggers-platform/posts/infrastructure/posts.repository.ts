import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../domain/post.enitity';

export class PostsRepository {
  constructor(@InjectModel(Post.name)
              private PostModel:PostModelType) {
  }
  async save (post:PostDocument) {
    await post.save();
  }
}