import { Body, Controller, InternalServerErrorException, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileBodyInterceptor } from './pipes/parse-tags.pipe';
import { MediaService } from '../media/media.service';
import { CreatePostDto } from './dto/create-post.dto';
import { InsertPostDto } from './dto/insert-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    private fileUrl: string;
    constructor(
        private readonly mediaService: MediaService,
        private readonly postService: PostService
    ) { }

    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FileBodyInterceptor, FileInterceptor('file', {
        limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
    }))
    async createPost(
        @Body() createPostDto: CreatePostDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() request: Request
    ) {
        try {
            const result = await this.mediaService.uploadFile(file);
            this.fileUrl = result.Location;
            const postData: InsertPostDto = {
                ...createPostDto,
                user_id: request['user'].sub,
                media_url: this.fileUrl,
            };

            return await this.postService.savePost(postData);
        } catch (e) {
            let deleteMediaResult: string;
            if (this.fileUrl) {
                deleteMediaResult = await this.mediaService.deleteFile(this.fileUrl);
            }
            throw new InternalServerErrorException(`delete media result: ${deleteMediaResult}`, { description: e.message });
        }
    }
}
