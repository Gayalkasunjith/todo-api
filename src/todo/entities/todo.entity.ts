import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoDto } from '../dto/todo.dto';
import { StatusEnum } from '../../util/status.enum';
@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'modifiedAt' })
  modifiedAt: Date;
  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.IN_PROGRESS })
  status: StatusEnum;

  static fromDto(todoDto: TodoDto): Todo {
    const todo = new Todo();
    todo.title = todoDto.title;
    todo.status = todoDto.status;
    return todo;
  }
}
