import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: TodoDto): Promise<TodoDto> {
    const todo = Todo.fromDto(createTodoDto);
    await this.todoRepository.insert(todo);
    return createTodoDto;
  }

  async findAll(): Promise<TodoDto[]> {
    const todos = await this.todoRepository.find();
    return todos.map((todo) => TodoDto.fromEntity(todo));
  }

  async findOne(id: number): Promise<TodoDto> {
    const todo = new Todo();
    todo.id = id;
    return await this.todoRepository
      .findOneBy(todo)
      .then((value) => TodoDto.fromEntity(value));
  }

  update(id: number, updateTodoDto: TodoDto) {
    const todo = Todo.fromDto(updateTodoDto);
    return this.todoRepository.update(id, todo);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
