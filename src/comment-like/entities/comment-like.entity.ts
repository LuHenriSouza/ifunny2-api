import { User } from 'src/user/entities/user.entity';
import { Comment} from 'src/comment/entities/comment.entity'
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity('comment_likes')
export class CommentLike {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.commentLikes)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Comment, comment => comment.commentLikes)
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;

    @CreateDateColumn()
    created_at: Date;
}
