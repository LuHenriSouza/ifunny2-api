import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InsertPostDto } from './dto/insert-post.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async savePost(postData: InsertPostDto): Promise<Post> {
        const user = await this.userRepository.findOne({
            where: { id: postData.user_id },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const post = this.postRepository.create({ ...postData, user });
        return await this.postRepository.save(post);
    }
}
