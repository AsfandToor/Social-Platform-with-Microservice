import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Post {
  @Prop()
  caption: string;

  @Prop({
    ref: 'User',
  })
  author: Types.ObjectId;

  @Prop({
    ref: 'Comment',
  })
  comments: Types.ObjectId[];

  @Prop({
    type: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
  })
  images: {
    url: string;
    public_id: string;
  }[];
}
export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.plugin(mongoosePaginate);
