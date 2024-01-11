import { OmitType } from "@nestjs/mapped-types";
import { IsIn, IsOptional } from "class-validator";
import { FindAllDto } from "src/dto/find-all.dto";

export class FindAllUserDto extends OmitType(FindAllDto, ['sort'] as const) {
    @IsOptional()
    @IsIn(['id', 'username', 'email', 'createdAt', 'updatedAt'])
    sort: 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt' = 'id';
}