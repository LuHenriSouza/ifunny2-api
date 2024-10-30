import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.commentLikes)
    user: User;

    @ManyToOne(() => Post, post => post.likes)
    post: Post;

    @CreateDateColumn()
    created_at: Date;
}
