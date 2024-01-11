import { Module } from "@nestjs/common";
import { Quiz } from "./quiz.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz])
    ],
    controllers: [QuizController],
    providers: [QuizService],
})

export class QuizModule { }