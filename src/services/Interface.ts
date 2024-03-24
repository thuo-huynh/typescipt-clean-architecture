import { Translation } from '@/services/entity/Translation';

export interface ITranslateUseCase {
  translate(orgText: string, source: string, dest: string): Promise<Translation>;
  fetchHistories(): Promise<Translation[]>;
}

export interface ITranslateRepository {
  getTranslation(orgText: string, source: string, dest: string): Promise<Translation>;
  findHistories(): Promise<Translation[]>;
  insertTranslation(translation: Translation): Promise<void>;
}

export interface IGoogleService {
  translate(orgText: string, source: string, dest: string): Promise<Translation>;
}
