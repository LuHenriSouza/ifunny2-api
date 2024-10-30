import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { MediaModule } from './media/media.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database/database.module';
import { CommentLikeModule } from './comment-like/comment-like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    LikeModule,
    MediaModule,
    CommentModule,
    DatabaseModule,
    CommentLikeModule,
  ]
})
export class AppModule { }
