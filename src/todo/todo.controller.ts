import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  private logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {
  }

  @Post()
  async create(@Body() createTodoDto: TodoDto): Promise<TodoDto> {
    this.logger.log('create invoked...', createTodoDto);
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<TodoDto[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    return await this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Successfully Updated' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(@Param('id') id: string, @Body() updateTodoDto: TodoDto): Promise<TodoDto> {
    await this.todoService.update(+id, updateTodoDto);
    return updateTodoDto;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successfully Deleted' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
