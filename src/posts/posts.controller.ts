import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from '../media/media.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const result = await this.mediaService.uploadFile(file);
        return { url: result.Location };  // Retorna o link do arquivo no Spaces
    }
}
