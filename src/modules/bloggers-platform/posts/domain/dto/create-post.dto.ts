import { LikeStatusEnum } from '../extended.likes.schema';

export class NewestLikesDto {
    addedAt: Date
    userId:  string
    login: string
}

export class ExtendedLikesDto {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatusEnum;
  newestLikes: NewestLikesDto[]
}
export class CreatePostDto {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date
  extendedLikesInfo:ExtendedLikesDto
}
