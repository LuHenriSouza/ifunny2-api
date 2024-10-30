import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { CommentLike } from 'src/comment-like/entities/comment-like.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    
    // referências
    @OneToMany(() => CommentLike, commentLike => commentLike.comment)
    commentLikes: CommentLike[];
}
