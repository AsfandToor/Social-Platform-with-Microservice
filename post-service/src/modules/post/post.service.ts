import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    @InjectModel(Post.name)
    private readonly postPModel: PaginateModel<PostDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async fetch(query: { limit: number; page: number }) {
    const { page, limit } = query;
    try {
      const response = await this.postPModel.paginate(
        {},
        { page: page || 1, limit: limit || 10, sort: { createdAt: -1 } },
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(dto: CreatePostDto) {
    try {
      const response = await this.postModel.create({
        caption: dto.caption,
        images: dto.images,
        author: new Types.ObjectId(dto.author),
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, dto: UpdatePostDto) {
    try {
      const response = await this.postModel.findByIdAndUpdate(id, {
        $set: { ...dto },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const post = await this.postModel.findById(id);
      if (!post) throw new Error('Post not found');

      const imagePromises = post.images.map((image) =>
        this.cloudinaryService.deleteFile(image.public_id),
      );

      await Promise.all(imagePromises);

      const response = await this.postModel.findByIdAndDelete(id);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
