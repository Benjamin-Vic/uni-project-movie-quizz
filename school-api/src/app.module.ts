import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { QuizModule } from './components/quiz/quiz.module';

import { User } from './components/user/user.entity';
import { Quiz } from './components/quiz/quiz.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('PSQL_HOST'),
                port: +configService.get('PSQL_PORT'),
                username: configService.get('PSQL_USERNAME'),
                password: configService.get('PSQL_PASSWORD'),
                database: configService.get('PSQL_DATABASE'),
                entities: [User, Quiz],
                synchronize: configService.get('PSQL_SYNC') === 'true',
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        QuizModule
    ],
})
export class AppModule { }
