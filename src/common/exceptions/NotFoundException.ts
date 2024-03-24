import { ErrorDetail } from './../interfaces/express';
import { ValidationError } from 'class-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import BaseException from './BaseException';

export default class NotFoundException extends BaseException {
  constructor(description: ErrorDetail[] | ErrorDetail) {
    super({
      httpCode: HttpStatusCode.NOT_FOUND,
      description,
    });
  }
}
