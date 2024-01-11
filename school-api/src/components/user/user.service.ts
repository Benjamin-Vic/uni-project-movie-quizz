import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    findAll(options: FindManyOptions<User>): Promise<[User[], number]> {
        return this.userRepository.findAndCount(options);
    }

    findOne(options: FindOneOptions<User>): Promise<User | null> {
        return this.userRepository.findOne(options);
    }

    async create(dto: CreateUserDto): Promise<User> {
        dto.password = await bcrypt.hash(dto.password, 10);

        return this.userRepository.save(dto);
    }

    async update(user: User, dto: UpdateUserDto): Promise<User> {
        if (!!dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }

        Object.assign(user, dto);

        return this.userRepository.save(user);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
}
