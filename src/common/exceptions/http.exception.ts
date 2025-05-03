import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(message: string = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundException extends BaseException {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
}

export class ConflictRequestException extends BaseException {
  constructor(message: string = 'Conflict request') {
    super(message, HttpStatus.CONFLICT);
  }
}
