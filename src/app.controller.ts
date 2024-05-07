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
    const cidade = query.cidade.toString();

    if (!cidade) {
      return {
        error: true,
        mensagem: 'O campo Cidade é obrigatório',
      };
    }

    return this.appService.getData(cidade);
  }

  @Get('logs')
  getStats(): any {
    return this.appService.getLogs();
  }
}
