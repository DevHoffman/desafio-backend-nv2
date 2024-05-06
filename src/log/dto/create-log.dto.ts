// create-Log.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty({ message: 'O campo cidade é obrigatório' })
  @IsString()
  cidade: string;

  @IsNotEmpty({ message: 'O nome da playlist é obrigatório' })
  @IsString()
  playlist: string;

  @IsNotEmpty({ message: 'As músicas são obrigatórias' })
  musicas: string;

  @IsNotEmpty({ message: 'Data de cadastro é obrigatório' })
  @IsString()
  dat_cadastro: string;
}
