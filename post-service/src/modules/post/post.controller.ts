import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  fetch(@Query() query: { limit: number; page: number }) {
    return this.postService.fetch(query);
  }

  @Get(':id')
  fetchById(@Param('id') id: string) {
    return this.postService.fetchById(id);
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

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 3))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    const filePromise = files.map((file) =>
      this.cloudinaryService.uploadFile(file),
    );

    const uploadedFiles = await Promise.all(filePromise);

    return uploadedFiles.map((file) => ({
      url: file.url,
      public_id: file.public_id,
    }));
  }
}
