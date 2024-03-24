import { ValidationError } from 'class-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import { ErrorDetail } from '../interfaces/express';
import BaseException from './BaseException';

export default class BadRequestException extends BaseException {
  constructor(description: ErrorDetail[] | ErrorDetail) {
    super({
      httpCode: HttpStatusCode.BAD_REQUEST,
      description,
    });
  }
}
