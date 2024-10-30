import { Body, Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../media/media.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { InsertPostDto } from './dto/insert-post.dto';

@Controller('post')
export class PostController {
    constructor(
        private readonly mediaService: MediaService,
        private readonly postService: PostService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
    }))
    async createPost(
        @UploadedFile() file: Express.Multer.File,
        @Body() createPostDto: CreatePostDto,
    ) {
        try {
            const result = await this.mediaService.uploadFile(file);
            const postData: InsertPostDto = {
                ...createPostDto,
                media_url: result.Location,
            };
            await this.postService.savePost(postData);
            return { url: result.Location };
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
