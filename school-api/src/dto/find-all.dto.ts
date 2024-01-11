import { IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class FindAllDto {
    @IsOptional()
    @IsNumberString({ no_symbols: true })
    limit: string = '10';

    @IsOptional()
    @IsNumberString({ no_symbols: true })
    offset: string = '0';

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order: string = 'ASC';

    @IsOptional()
    @IsString()
    sort: string = 'id';

    @IsOptional()
    @IsString()
    search: string = '';
}