import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MediaModule } from 'src/media/media.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    MediaModule,
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
