import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { CommentLike } from 'src/comment-like/entities/comment-like.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    // referências
    @OneToMany(() => CommentLike, commentLike => commentLike.comment)
    commentLikes: CommentLike[];
}
