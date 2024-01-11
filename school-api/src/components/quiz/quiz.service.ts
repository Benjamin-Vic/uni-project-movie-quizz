import { Repository } from "typeorm";
import { Quiz } from "./quiz.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { User } from "../user/user.entity";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    ) { }

    // findAll(options: FindManyOptions<Quiz>): Promise<[Quiz[], number]> {
    //     return this.quizRepository.findAndCount(options);
    // }

    // findOne(options: FindOneOptions<Quiz>): Promise<Quiz | null> {
    //     return this.quizRepository.findOne(options);
    // }

    async create(user: User, dto: CreateQuizDto): Promise<Quiz> {
        const quiz: Quiz = new Quiz();
        Object.assign(quiz, dto);

        quiz.user = user;

        return this.quizRepository.save(quiz);
    }
}