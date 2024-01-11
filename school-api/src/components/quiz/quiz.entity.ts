import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.quizzes)
    user: User;

    @Column({
        nullable: false,
        unique: false,
        name: 'movie_id',
        type: 'varchar',
    })
    movieId: string;

    @Column({
        nullable: false,
        unique: false,
        name: 'released',
        type: 'boolean',
    })
    released: boolean;

    @Column({
        nullable: false,
        unique: false,
        name: 'runtime',
        type: 'boolean',
    })
    runtime: boolean;

    @Column({
        nullable: false,
        unique: false,
        name: 'writer',
        type: 'boolean',
    })
    writer: boolean;

    @Column({
        nullable: false,
        unique: false,
        name: 'actors',
        type: 'boolean',
    })
    actors: boolean;

    @Column({
        nullable: false,
        unique: false,
        name: 'box_office',
        type: 'boolean',
    })
    boxOffice: boolean;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

}
