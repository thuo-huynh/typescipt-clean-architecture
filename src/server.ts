import dotenv from 'dotenv';
import 'reflect-metadata';
import createInstance from './app';
import { logger } from './common/logger/logger';

dotenv.config();
createInstance().catch((err) => {
  logger.error(err);
});
