import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(newUser: CreateUserDto): Promise<User> {
        try {
            newUser.password = await hashPassword(newUser.password);
            const user = this.userRepository.create(newUser);
            return await this.userRepository.save(user);
        }catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}