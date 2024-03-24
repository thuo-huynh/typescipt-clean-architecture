import { IGoogleService } from '@/services/Interface';
import translate from 'translation-google';
import { Translation } from '@/services/entity/Translation';

class GoogleService implements IGoogleService {
  translate(orgText: string, source: string, dest: string): Promise<Translation> {
    return new Promise((resolve, reject) => {
      translate(orgText, { from: source, to: dest })
        .then((result: { text: string }) => {
          const translatedText = result.text;
          const translation = new Translation(orgText, source, dest, translatedText);
          resolve(translation);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}

export default new GoogleService();
