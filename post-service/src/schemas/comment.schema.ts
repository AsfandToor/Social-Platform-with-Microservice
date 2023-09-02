import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Comment {
  @Prop()
  comment: string;

  @Prop({
    ref: 'User',
  })
  author: Types.ObjectId;

  @Prop({
    ref: 'Post',
  })
  post: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.plugin(mongoosePaginate);
