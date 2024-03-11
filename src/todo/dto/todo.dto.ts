import { Todo } from '../entities/todo.entity';
import { StatusEnum } from '../../util/status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  id: number;
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  createdAt: Date;
  modifiedAt: Date;
  @ApiProperty({ enum: ['IN_PROGRESS', 'HOLD', 'COMPLETED'] })
  @IsEnum(['IN_PROGRESS', 'HOLD', 'COMPLETED'], {
    message: 'Use Valid Status',
  })
  status: StatusEnum;

  static fromEntity(todo: Todo): TodoDto {
    const todoDto = new TodoDto();
    todoDto.id = todo.id;
    todoDto.title = todo.title;
    todoDto.createdAt = todo.createdAt;
    todoDto.modifiedAt = todo.modifiedAt;
    todoDto.status = todo.status;
    return todoDto;
  }
}
