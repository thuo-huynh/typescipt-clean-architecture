import config from '@/common/configs';
import { logger } from '@/common/logger/logger';
import { DataSource } from 'typeorm';
import { Translation } from '../../services/entity/Translation';

export default class PgDatabase {
  readonly dataSource = new DataSource({
    ...config.postgresConfig,
    entities: [Translation],
  });

  connection: DataSource;
  async connect(): Promise<DataSource> {
    try {
      this.connection = await this.dataSource.initialize();
      logger.info('Connect PostgreSQL Database Successfully!');
      return this.connection;
    } catch (error) {
      logger.error(`Connect PostgreSQL Database Error: ${error}`);
      process.exit(1);
    }
  }

  async clean(): Promise<void> {
    try {
      const entities = this.dataSource.entityMetadatas;
      const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(', ');
      await this.dataSource.query(`TRUNCATE ${tableNames} CASCADE;`);
      logger.info('[DATABASE]: Cleaned up database');
    } catch (error) {
      throw new Error(`Database Cleanup Error: ${error}`);
    }
  }
}

export const pgDatabase = new PgDatabase();
