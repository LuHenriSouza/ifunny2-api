import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly jwtExpiration: number;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        configService: ConfigService,
    ) {
        this.jwtExpiration = +configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(login: LoginDto):Promise<AuthResponseDto> {
        const user = await this.userService.getByEmail(login.email);
        if (!user || !compareSync(login.password, user.password))
            throw new UnauthorizedException();

        const payload = { sub: user.id, username: user.username }

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpiration }
    }
}
