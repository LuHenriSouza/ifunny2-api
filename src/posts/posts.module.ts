import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [MediaModule],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule { }
