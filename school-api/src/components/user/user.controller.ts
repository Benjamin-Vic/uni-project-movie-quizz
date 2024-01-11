import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";

import { Request } from 'express';

import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

import { User } from "./user.entity";

import { UserService } from "./user.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindAllUserDto } from "./dto/find-all-user.dto";

import { UserNotFoundException } from "../../exceptions/user/user-not-found.exception";
import { UserEmailAlreadyExistsException } from "../../exceptions/user/user-email-already-exists.exception";

import { OutFindAllInterface } from "../../interfaces/out-find-all.interface";

import { RemoveUserPasswordInterceptor } from "./interceptor/remove-user-password.interceptor";
import { RemoveUsersPasswordInterceptor } from "./interceptor/remove-users-password.interceptor";
import { Like } from "typeorm";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @UseInterceptors(RemoveUsersPasswordInterceptor)
    @Get()
    async findAll(@Query() query: FindAllUserDto): Promise<OutFindAllInterface<User>> {

        // console.log(query);

        const [users, count] = await this.userService.findAll({
            where: {
                username: Like(`%${query.search}%`),
                email: Like(`%${query.search}%`),
            },
            order: { [query.sort]: query.order },
            take: parseInt(query.limit),
            skip: parseInt(query.offset) * parseInt(query.limit),
        });


        return { count, data: users };
    }

    @UseInterceptors(RemoveUserPasswordInterceptor)
    @Get("me")
    async findMe(@Req() req: Request): Promise<User> {
        return req.user as User;
    }

    @UseInterceptors(RemoveUserPasswordInterceptor)
    @Get(":id")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user: User | null = await this.userService.findOne({ where: { id } });

        if (user === null) {
            throw new UserNotFoundException();
        }

        return user
    }

    @UseInterceptors(RemoveUserPasswordInterceptor)
    @Post()
    async create(@Body() dto: CreateUserDto): Promise<User> {
        if (await this.userService.findOne({ where: { email: dto.email } }) !== null) {
            throw new UserEmailAlreadyExistsException();
        }

        return this.userService.create(dto);
    }

    @UseInterceptors(RemoveUserPasswordInterceptor)
    @Put(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<User> {
        const user: User | null = await this.userService.findOne({ where: { id } });

        if (user === null) {
            throw new UserNotFoundException();
        }

        if (!!dto.email) {
            if ((await this.userService.findOne({ where: { email: dto.email } })) !== null && dto.email !== user.email) {
                throw new UserEmailAlreadyExistsException();
            }
        }

        return this.userService.update(user, dto);
    }

    @Delete(":id")
    async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
        const user: User | null = await this.userService.findOne({ where: { id } });

        if (user === null) {
            throw new UserNotFoundException();
        }

        await this.userService.remove(id);
    }
}
