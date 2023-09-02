import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  fetch(@Query() query: { limit: number; page: number }) {
    return this.postService.fetch(query);
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePostDto) {
    return this.postService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
