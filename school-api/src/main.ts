import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            // allowedHeaders: ['Content-Type', 'Authorization'],
        }
    });

    const configService = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    app.use(helmet());

    await app.listen(configService.get('PORT') as number);
}

bootstrap();
