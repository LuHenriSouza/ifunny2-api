import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InsertPostDto } from './dto/insert-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async savePost(postData: InsertPostDto): Promise<Post> {
        const post = this.postRepository.create(postData);
        return await this.postRepository.save(post);
    }
}
