import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { UserEmailAlreadyExistsException } from 'src/exceptions/user/user-email-already-exists.exception';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user: User | null = await this.userService.findOne({ where: { email } });

        if (user === null || !(await bcrypt.compare(pass, user.password as string))) {
            return null;
        }

        const { password, ...result } = user;
        return result;
    }

    async signIn(user: User): Promise<{ token: string }> {
        return { token: this.jwtService.sign({ id: user.id }) };
    }

    async signUp(dto: CreateUserDto): Promise<{ token: string }> {
        if (await this.userService.findOne({ where: { email: dto.email } }) !== null) {
            throw new UserEmailAlreadyExistsException();
        }

        const user: User = await this.userService.create(dto);

        return { token: this.jwtService.sign({ id: user.id }) };
    }
}
