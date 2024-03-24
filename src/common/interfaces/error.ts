import { ErrorDetail } from './express';
import { ValidationError } from 'class-validator';

export interface ErrorArgs {
  httpCode: number;
  description: ErrorDetail | ErrorDetail[];
  isOperational?: boolean;
}
