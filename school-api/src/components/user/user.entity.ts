import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: false,
        name: 'username',
        type: 'varchar',
        length: 32,
    })
    username: string;

    @Column({
        nullable: false,
        unique: true,
        name: 'email',
        type: 'varchar',
        length: 320,
    })
    email: string;

    @Column({
        nullable: false,
        unique: false,
        name: 'password',
        type: 'varchar',
    })
    password?: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        nullable: false,
        unique: false,
        name: 'omdb_key',
        type: 'varchar',
    })
    omdbKey?: string;

    @OneToMany(type => Quiz, quiz => quiz.user)
    quizzes: Quiz[];

}
