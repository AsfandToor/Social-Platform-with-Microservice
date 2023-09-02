import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './comment.dto';
import { Post } from 'src/schemas/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Comment.name)
    private readonly commentPModel: PaginateModel<CommentDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<CommentDocument>,
  ) {}

  async fetch(id: string, query: { page: number; limit: number }) {
    const { page, limit } = query;
    try {
      return await this.commentPModel.paginate(
        {
          _id: new Types.ObjectId(id),
        },
        { page: page || 1, limit: limit || 10, sort: { createdAt: -1 } },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(dto: CreateCommentDto) {
    const response = await this.commentModel.create({
      comment: dto.comment,
      author: new Types.ObjectId(dto.author),
      post: new Types.ObjectId(dto.post),
    });
    await this.postModel.updateOne(
      { _id: response.post },
      { $push: { comments: response._id } },
    );
    return response;
  }

  async update(id: string, comment: string) {
    try {
      const response = await this.commentModel.findByIdAndUpdate(id, {
        $set: { comment },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const response = await this.commentModel.findByIdAndDelete(id);
      await this.postModel.updateOne(
        { _id: response?.post },
        { $pull: { comments: response._id } },
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
