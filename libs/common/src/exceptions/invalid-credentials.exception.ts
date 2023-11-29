import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsExcepion extends HttpException {
  constructor() {
    super('Invalid Credentials', HttpStatus.BAD_REQUEST);
  }
}
