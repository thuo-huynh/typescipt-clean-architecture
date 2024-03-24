import { Translation } from '@/services/entity/Translation';
import { ITranslateRepository } from '@/services/Interface';
import PgDatabase, { pgDatabase } from './PgDatabase';

const tbName = 'translation';

class TranslateRepository implements ITranslateRepository {
  private db: PgDatabase;

  constructor(db: PgDatabase) {
    this.db = db;
  }

  async insertTranslation(translation: Translation): Promise<void> {
    try {
      await this.db.dataSource.createQueryBuilder().insert().into(tbName).values(translation).execute();
    } catch (error) {
      throw error;
    }
  }

  async getTranslation(orgText: string, source: string, dest: string): Promise<Translation> {
    try {
      const data: any = await this.db.dataSource
        .createQueryBuilder()
        .select()
        .from(tbName, 'tbl')
        .where('original_text = :orgText AND source = :source AND destination = :dest', { orgText, source, dest })
        .take(1)
        .getRawOne();

      console.log('data', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findHistories(): Promise<Translation[]> {
    try {
      const histories = await this.db.dataSource.createQueryBuilder().from(tbName, 'tbl').execute();
      return histories;
    } catch (error) {
      throw error;
    }
  }
}

export default new TranslateRepository(pgDatabase);
