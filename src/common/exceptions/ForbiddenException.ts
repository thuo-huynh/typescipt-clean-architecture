import { ValidationError } from 'class-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import { ErrorDetail } from '../interfaces/express';
import BaseException from './BaseException';

export default class ForbiddenException extends BaseException {
  constructor(description: ErrorDetail[] | ErrorDetail) {
    super({
      httpCode: HttpStatusCode.FORBIDDEN,
      description,
    });
  }
}
