import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
