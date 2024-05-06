import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-menu.dto';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    private readonly dataSource: DataSource,
  ) {}
  // Add CRUD operations you intend to use here

  async findAll(): Promise<Log[]> {
    const data = await this.logRepository.find();
    return data;
  }

  async findStats() {
    const data = await this.dataSource
      .getRepository(Log)
      .createQueryBuilder('log')
      .select('cidade, count(cidade) consultas')
      .groupBy('cidade')
      .getRawMany();
    return data;
  }

  async findOne(id: number): Promise<Log> {
    const log = await this.logRepository.findOne({ where: { id: id } });
    if (!log) {
      throw new NotFoundException(`Log with ID ${id} not found`);
    }
    return log;
  }

  async create(createLogDto: CreateLogDto): Promise<Log> {
    const log = this.logRepository.create(createLogDto);
    return await this.logRepository.save(log);
  }

  async update(id: number, updateLogDto: UpdateLogDto): Promise<Log> {
    const log = await this.findOne(id);
    Object.assign(log, updateLogDto);
    return await this.logRepository.save(log);
  }
  async remove(id: number) {
    const result = await this.logRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A log "${id}" was not found`);
    }
    return { message: 'Log successfully deleted' };
  }

  countCidade(array) {
    let itemAnterior = { cidade: null, count: 1 };
    const arr = [];
    array.map((item: { count: number; cidade: string }) => {
      if (itemAnterior.cidade !== item.cidade) {
        item.count = 1;
        arr.push(item);
      } else {
        itemAnterior.count = itemAnterior.count + 1;
      }

      itemAnterior = item;
      console.log(item);
    });

    return arr;
  }
}
