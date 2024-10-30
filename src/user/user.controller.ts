import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() user: CreateUserDto) {
        try {
            return this.userService.create(user);
        }catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
