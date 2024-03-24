import { ErrorDetail } from './../interfaces/express';
import { ValidationError } from 'class-validator';
import HttpStatusCode from '../constants/HttpStatusCode';
import BaseException from './BaseException';

export default class Exception extends BaseException {
  constructor(description: ErrorDetail[] | ErrorDetail, httpCode: HttpStatusCode) {
    super({
      httpCode,
      description,
    });
  }
}
