// Import necessary modules and dependencies
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LogService } from './log.service';
import { Log } from './log.entity';
import { UpdateLogDto } from './dto/update-menu.dto';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('log') // Define the base route for this controller
export class LogController {
  constructor(private readonly logService: LogService) {} // Inject the LogService instance

  @Post() // Handle HTTP POST requests to create a log
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.create(createLogDto);
  }

  @Get() // requests to retrieve all logs
  findAll(): Promise<Log[]> {
    return this.logService.findAll();
  }

  @Get(':id') // requests to retrieve a log by ID
  findOne(@Param('id') id: string): Promise<Log> {
    return this.logService.findOne(+id);
  }

  @Put(':id') // PUT requests to update log by ID
  update(
    @Param('id') id: string,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<Log> {
    return this.logService.update(+id, updateLogDto);
  }

  @Delete(':id') // HTTP DELETE requests to remove a log by ID
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}
