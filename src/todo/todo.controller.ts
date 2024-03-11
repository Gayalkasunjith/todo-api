import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { ErrorDto } from './error/custom.error';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  private logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiCreatedResponse({
    type: TodoDto,
  })
  async create(@Body() createTodoDto: TodoDto): Promise<TodoDto> {
    this.logger.log('create invoked...', createTodoDto);
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOkResponse({
    type: TodoDto,
    isArray: true,
  })
  async findAll(): Promise<TodoDto[]> {
    this.logger.log('Find All Todo invoked...');
    return await this.todoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: TodoDto,
  })
  @ApiNotFoundResponse({ type: ErrorDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    this.logger.log('Find one todo invoked... Id = ', id);
    try {
      return await this.todoService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Successfully Updated' })
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: TodoDto,
  ): Promise<TodoDto> {
    this.logger.log('Update Method invoked... Id = ', id, updateTodoDto);
    await this.todoService.update(+id, updateTodoDto);
    return updateTodoDto;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully Deleted' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
