import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, CloudinaryService],
})
export class PostModule {}
