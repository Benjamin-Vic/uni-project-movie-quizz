import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guard/local-auth.guard';

import { User } from '../user/user.entity';

import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Req() req: Request): Promise<{ token: string }> {
        return this.authService.signIn(req.user as User);
    }

    @Post('signup')
    async signUp(@Body() dto: CreateUserDto): Promise<{ token: string }> {
        return this.authService.signUp(dto);
    }
}
