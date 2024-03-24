import isArray from 'lodash/isArray';
import { ErrorArgs } from '../interfaces/error';
import { ErrorDetail } from '../interfaces/express';

export default class BaseException extends Error {
  public readonly httpCode: number;
  public readonly isOperational: boolean = true;
  public readonly errors: ErrorDetail | ErrorDetail[];

  constructor(private args: ErrorArgs) {
    const { description, httpCode, isOperational } = args;

    const error = isArray(description)
      ? description.map(({ errorCode, errorMessage }) => ({
          errorCode: errorCode,
          errorMessage: errorMessage,
        }))
      : description;
    super(JSON.stringify(error));
    this.errors = error;

    Object.setPrototypeOf(this, new.target.prototype);
    this.httpCode = httpCode;
    if (isOperational !== undefined) {
      this.isOperational = isOperational;
    }
    // Error.captureStackTrace(this);
  }
}
