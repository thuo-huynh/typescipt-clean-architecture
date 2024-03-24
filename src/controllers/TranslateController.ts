import { Request, Response } from 'express'; // Assuming Express.js is used as the web framework
import translateService from '@/services/TranslateService';
import { ITranslateUseCase } from '@/services/Interface';

class TranslateController {
  private service: ITranslateUseCase;

  constructor(translateService: ITranslateUseCase) {
    this.service = translateService;
  }

  translate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { originalText, source, destination } = req.body;
      const result = await this.service.translate(originalText, source, destination);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  history = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.fetchHistories();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new TranslateController(translateService);
