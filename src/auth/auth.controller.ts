import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async signIn(@Body() login: LoginDto): Promise<AuthResponseDto> {
        return await this.authService.signIn(login);
    }
}
