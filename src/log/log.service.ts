import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-menu.dto';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}
  // Add CRUD operations you intend to use here

  async findAll(): Promise<Log[]> {
    return await this.logRepository.find();
  }

  async findStats() {
    const res = await this.logRepository.find({
      select: { cidade: true },
      order: { cidade: 'ASC' },
    });
    const data = this.countCidade(res);

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
    let itemAnterior;
    let arr = [];
    let i = 1;
    array.map((item: { cidade: string }) => {
      // const exist = arr.indexOf(item.cidade);
      if (typeof itemAnterior != null) console.log(itemAnterior);
      // if (exist == -1) return arr.push({ cidade: item.cidade, counter: i });
      itemAnterior = item;
      i++;
    });

    return arr;
  }
}
