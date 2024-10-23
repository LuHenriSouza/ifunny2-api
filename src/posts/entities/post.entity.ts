import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

export enum EMediaType {
  photo = 'photo',
  video = 'video'
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  media_type: EMediaType;

  @Column()
  media_url: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}
