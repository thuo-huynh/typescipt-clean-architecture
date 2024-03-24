import googleService from '@/infras/googlesv/Translate';
import translateRepository from '@/infras/postgres/TranslateRepository';
import { Translation } from '@/services/entity/Translation';
import { IGoogleService, ITranslateRepository, ITranslateUseCase } from '@/services/Interface';

class TranslateService implements ITranslateUseCase {
  private repository: ITranslateRepository;
  private googleService: IGoogleService;

  constructor(repository: ITranslateRepository, googleService: IGoogleService) {
    this.repository = repository;
    this.googleService = googleService;
  }

  async translate(orgText: string, source: string, dest: string): Promise<Translation> {
    try {
      const oldTrans = await this.repository.getTranslation(orgText, source, dest);
      if (oldTrans) return oldTrans;
      console.log('oldTrans: ', oldTrans);
      const newTrans = await this.googleService.translate(orgText, source, dest);
      await this.repository.insertTranslation(newTrans);
      console.log('newTrans: ', newTrans);
      return newTrans;
    } catch (err) {
      throw err;
    }
  }

  async fetchHistories(): Promise<Translation[]> {
    return this.repository.findHistories();
  }
}

export default new TranslateService(translateRepository, googleService);
