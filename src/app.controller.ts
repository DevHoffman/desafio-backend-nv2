import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Req() { query }: Request): any {
    const cidade = query.cidade;
    // const cep = query.cep;
    const apiKey = 'c53be525dc986cffe2262b3f36f1519d';

    if (!cidade) {
      return {
        error: true,
        mensagem: 'O campo Cidade é obrigatório',
      };
    }

    return this.appService.getData(cidade, apiKey);
  }

  @Get('logs')
  getHistory(): any {
    return this.appService.getLogs();
  }

  // @Get('token')
  // getToken(): any {
  //   const client_id = 'fc01ff40b06a4f5e841e36652136d9cf';
  //   const client_secret = '2d6736d161014aaeba4d194a20edf5ff';

  //   return this.appService.getToken(client_id, client_secret);
  // }

  // @Get('playlist')
  // getPlaylist(@Req() { query }: Request): any {
  //   return this.appService.getPlaylist(query);
  // }
}
