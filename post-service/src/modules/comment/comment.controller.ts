import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  fetch(
    @Param('id') id: string,
    @Query() query: { limit: number; page: number },
  ) {
    return this.commentService.fetch(id, query);
  }

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('comment') comment: string) {
    return this.commentService.update(id, comment);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
