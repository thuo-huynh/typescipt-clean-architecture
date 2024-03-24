import config from '@/common/configs/index';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import baseExceptionHandler from './common/exceptions/handler/BaseExceptionHandler';
import { logger } from './common/logger/logger';
import { pgDatabase } from './infras/postgres/PgDatabase';
import router from './routes';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.initializeErrorHandle();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeErrorHandle() {
    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      baseExceptionHandler.handleError(err, res);
    });
  }

  routes() {
    this.app.use(config.contextPath, router);
  }
}

const createInstance = async () => {
  // Starting migrate to database
  await pgDatabase.connect();

  // Create instance app
  const instance = new App();

  const HOST = config.hostServer;
  const PORT = config.portServer;

  instance.app.listen(PORT, () => {
    logger.info(`Server running at http://${HOST}:${PORT}${config.contextPath}`);
  });
  return instance;
};

export default createInstance;
