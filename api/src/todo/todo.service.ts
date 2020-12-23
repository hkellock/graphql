import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodoInput } from './todo.input';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(input: TodoInput): Promise<Todo> {
    const todo = this.todoRepository.create(input);
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<string> {
    await this.todoRepository.delete(id);
    return id;
  }
}
