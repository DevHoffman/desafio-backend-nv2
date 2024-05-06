import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cidade', length: 255, nullable: false })
  cidade: string;

  @Column({ name: 'playlist', length: 255, nullable: false })
  playlist: string;

  @Column({ name: 'musicas', nullable: false })
  musicas: string;

  @Column({ name: 'dat_cadastro', length: 255, nullable: false })
  dat_cadastro: string;
}
