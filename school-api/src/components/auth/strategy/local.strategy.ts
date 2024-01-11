import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";

import { User } from "../../user/user.entity";

import { InvalidEmailPasswordException } from "../../../exceptions/invalid-email-password.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<User> {
        const user: User | null = await this.authService.validateUser(email, password);

        if (user === null) {
            throw new InvalidEmailPasswordException();
        }

        return user;
    }
}