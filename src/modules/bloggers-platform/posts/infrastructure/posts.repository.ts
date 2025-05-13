import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../domain/post.enitity';
import mongoose from 'mongoose';

export class PostsRepository {
  constructor(@InjectModel(Post.name)
              private PostModel:PostModelType) {
  }
  async save (post:PostDocument) {
    await post.save();
  }
  async deletePost (postId:string) {
    await this.PostModel.deleteOne({_id: new mongoose.Types.ObjectId(postId)});
  }
}