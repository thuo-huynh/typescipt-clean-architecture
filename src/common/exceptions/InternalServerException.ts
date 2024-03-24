import HttpStatusCode from '../constants/HttpStatusCode';
import { I18nMessage } from '../i18n/I18n';
import BaseException from './BaseException';

export default class InternalServerException extends BaseException {
  constructor(errorMessage: string) {
    super({
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      description: {
        errorCode: I18nMessage.serverInternal,
        errorMessage,
      },
    });
  }
}
