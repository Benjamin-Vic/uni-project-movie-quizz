import { Controller, UseGuards, Post, Body, Req, UseInterceptors } from "@nestjs/common";

import { Request } from 'express';

import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

import { Quiz } from "./quiz.entity";
import { User } from "../user/user.entity";

import { QuizService } from "./quiz.service";

import { CreateQuizDto } from "./dto/create-quiz.dto";

import { RemoveUserPasswordInterceptor } from "./interceptor/remove-user-password.interceptor";

@UseGuards(JwtAuthGuard)
@Controller("quiz")
export class QuizController {
    constructor(
        private quizService: QuizService,
    ) { }

    @UseInterceptors(RemoveUserPasswordInterceptor)
    @Post()
    async create(@Req() req: Request, @Body() dto: CreateQuizDto): Promise<Quiz> {
        return this.quizService.create(req.user as User, dto);
    }
}