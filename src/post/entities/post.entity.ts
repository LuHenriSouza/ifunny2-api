import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity'
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @Column('simple-array')
    tags: string[];

    @Column()
    media_url: string;

    @Column()
    thumbnail_url: string;

    @Column()
    view_count: number;

    @Column()
    comment_count: number;

    @Column()
    like_count: number;

    @CreateDateColumn()
    created_at: Date;

    // Referências
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => Like, like => like.post)
    likes: Like[];
}
