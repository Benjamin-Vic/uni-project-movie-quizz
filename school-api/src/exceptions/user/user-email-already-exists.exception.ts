import { HttpException, HttpStatus } from "@nestjs/common";

export class UserEmailAlreadyExistsException extends HttpException {
    constructor() {
        super("User's email address already exists", HttpStatus.BAD_REQUEST);
    }
}