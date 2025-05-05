import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class HttpExceptionCustom extends BaseException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }

  static BadRequest(message = 'Bad request') {
    return new HttpExceptionCustom(message, HttpStatus.BAD_REQUEST);
  }

  static NotFound(resource = 'Resource') {
    return new HttpExceptionCustom(resource, HttpStatus.NOT_FOUND);
  }

  static Conflict(message = 'Conflict request') {
    return new HttpExceptionCustom(message, HttpStatus.CONFLICT);
  }
}
