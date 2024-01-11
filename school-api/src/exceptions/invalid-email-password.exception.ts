import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidEmailPasswordException extends HttpException {
    constructor() {
        super("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }
}