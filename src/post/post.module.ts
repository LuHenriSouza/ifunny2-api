import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [MediaModule],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
