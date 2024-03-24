import { Response } from 'express';
import BaseException from '../BaseException';
import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { BodyResponse, ErrorDetail } from '@/common/interfaces/express';
import { logger } from '@/common/logger/logger';
import { I18nMessage } from '@/common/i18n/I18n';
import { isArray } from 'lodash';

class BaseExceptionHandler {
  public handleError(error: Error | BaseException, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as BaseException, response);
    } else {
      this.handleUntrustedError(error as Error, response);
    }
  }

  public isTrustedError(error: Error | BaseException): boolean {
    if (error instanceof BaseException) {
      return error.isOperational;
    }
    return false;
  }

  private handleTrustedError(error: BaseException, response: Response): void {
    const statusCode = error.httpCode;
    let errors: ErrorDetail[] = [];
    errors = !isArray(error.errors) ? [error.errors] : error.errors;
    const responseData: BodyResponse = {
      httpStatusCode: statusCode,
      errors,
    };
    if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      logger.error(errors[0].errorMessage);
      errors[0].errorMessage = 'Internal Server Error';
    }
    response.status(statusCode).json(responseData);
  }

  private handleUntrustedError(error: Error, response?: Response): void {
    const statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

    const errorDetail: ErrorDetail = { errorCode: I18nMessage.serverInternal, errorMessage: 'Internal server error' };
    const responseData: BodyResponse = {
      httpStatusCode: statusCode,
      errors: [errorDetail],
    };
    logger.error(error.message);
    if (response) {
      response.status(statusCode).json(responseData);
    }
  }
}

export default new BaseExceptionHandler();
