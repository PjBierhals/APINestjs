import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string | string[], status: number) {
    super(
      {
        message: Array.isArray(message) ? message : [message],
        error: HttpStatus[status] || 'Error',
        statusCode: status,
      },
      status,
    );
  }
}
