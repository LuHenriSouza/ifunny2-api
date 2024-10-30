import { User } from 'src/user/entities/user.entity';
import { Comment} from 'src/comment/entities/comment.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('comment_likes')
export class CommentLike {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.commentLikes)
    user: User;

    @ManyToOne(() => Comment, comment => comment.commentLikes)
    comment: Comment;

    @CreateDateColumn()
    created_at: Date;
}
