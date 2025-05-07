import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NewestLikes, NewestLikesSchema } from './newest.likes.schema';
export enum LikeStatusEnum {
  Like = "Like",
  Dislike = "Dislike",
  None = "None",
}
@Schema({
  _id:false
})
export class ExtendedLikes {
  @Prop({type: Number , required: true ,default:0})
  likesCount:number;
  @Prop({type: Number, required: true , default:0})
  dislikesCount:number;
  @Prop({type: String , enum: LikeStatusEnum , default: LikeStatusEnum.None})
  myStatus: LikeStatusEnum;
  @Prop({type: [NewestLikesSchema]})
  newestLikes:Array<NewestLikes>;
}

export const ExtendedLikesInfoSchema = SchemaFactory.createForClass(ExtendedLikes)