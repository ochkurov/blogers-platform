import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType } from '../domain/post.enitity';
import { CreateAndUpdatePostDto } from '../api/input-dto/post.create-update-dto';
import { BlogsRepository } from '../../blogs/infrastructure/blogs.repository';
import { PostsRepository } from '../infrastructure/posts.repository';

export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private PostModel: PostModelType,
    private blogsReposotory: BlogsRepository,
    private postsRepository: PostsRepository,
  ) {}

  async createPost(dto: CreateAndUpdatePostDto): Promise<string> {
    const blog = await this.blogsReposotory.getByIdBlogDocument(dto.blogId);
    const post = this.PostModel.createInstanse(dto, blog.name);
    await this.postsRepository.save(post)
    return post._id.toString();
  }
}
