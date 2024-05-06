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

}
