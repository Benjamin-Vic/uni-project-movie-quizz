import { IsBoolean, IsString } from "class-validator";

export class CreateQuizDto {
    @IsString()
    movieId: string;

    @IsBoolean()
    released: boolean;

    @IsBoolean()
    runtime: boolean;

    @IsBoolean()
    writer: boolean;

    @IsBoolean()
    actors: boolean;

    @IsBoolean()
    boxOffice: boolean;
}
