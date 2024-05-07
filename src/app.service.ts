import { Injectable } from '@nestjs/common';
import { LogService } from './log/log.service';

@Injectable()
export class AppService {
  constructor(private readonly logService: LogService) {} // This will be auto injected by Nestjs Injector
  getToken(client_id: string, client_secret: string): any {
    return fetch(`${process.env.SPOTIFY_URL_AUTH}/token`, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
    })
      .then((T) => T.json())
      .then((data) => {
        return data;
      });
  }

  getData(cidade: string | any, apiKey: string): any {
    const url = `${process.env.OPENWEATHERMAP_API}/weather?q=${cidade}&limit=1&appid=${apiKey}`;
    return fetch(url)
      .then((T) => T.json())
      .then((data: any) => {
        if (!data) {
          return {
            error: 200,
            mensagem: 'Nada encontrado',
          };
        }
        if (data.cod && data.cod == 404)
          return {
            error: 404,
            mensagem: 'Cidade não encontrada',
          };

        const temperatura = this.tempConvert(data.main.temp);

        let retorno;
        if (temperatura < 10) {
          retorno = this.getPlaylist(process.env.PLAYLIST_CLASSICA, cidade);
        }
        if (temperatura > 10 && temperatura < 25) {
          retorno = this.getPlaylist(process.env.PLAYLIST_ROCK, cidade);
        }
        if (temperatura > 25) {
          retorno = this.getPlaylist(process.env.PLAYLIST_POP, cidade);
        }

        return retorno;
      });
  }

  async getPlaylist(playlist: string, city: string) {
    const jsonToken = await this.getToken(
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET,
    ); // Gera o token na SPOTIFY
    const access_token = jsonToken.access_token; // Pega o token do objeto

    try {
      return await fetch(
        `${process.env.SPOTIFY_API}/playlists/${playlist}/?fields=name,tracks(items(track(name)))`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
        .then((T) => T.json())
        .then((data) => {
          const musicas = [];
          data.tracks.items.map((item: { track: { name: string } }) => {
            musicas.push(item.track.name);
          });

          const dados = {
            cidade: city,
            playlist: data.name,
            musicas: JSON.stringify(musicas),
            dat_cadastro: this.dateFormat(new Date()),
          };

          fetch(`${process.env.APP_URL}/log`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(dados),
          });

          return dados;
        });
    } catch (err) {
      console.log(err);
    }
  }

  getLogs() {
    const stats = this.logService.findStats();
    return stats;
  }

  dateFormat(date: Date): string {
    // Função de formatar data
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const hour = date.getHours();
    const min =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seg =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return mm + '/' + dd + '/' + yyyy + ' ' + hour + ':' + min + ':' + seg;
  }

  tempConvert(kelvin: number): number {
    if (!kelvin) {
      return null;
    }

    const celsius = kelvin - 273.15;
    return celsius;
  }
}
