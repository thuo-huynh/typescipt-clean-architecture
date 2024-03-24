import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'translation' })
export class Translation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'original_text' })
  originalText: string;

  @Column({ name: 'source' })
  source: string;

  @Column({ name: 'destination' })
  destination: string;

  @Column({ name: 'result_text' })
  resultText: string;

  constructor(originalText: string, source: string, destination: string, resultText: string) {
    super();
    this.originalText = originalText;
    this.source = source;
    this.destination = destination;
    this.resultText = resultText;
  }

  static ErrNotFound = new Error('not found');

  static newTranslation(orgText: string, source: string, dest: string, result: string): Translation {
    return new Translation(orgText, source, dest, result);
  }

  setResultText(s: string): void {
    this.resultText = s;
  }
}
