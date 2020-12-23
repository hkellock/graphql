import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TodoInput } from './todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo!]!)
  async todos() {
    return await this.todoService.findAll();
  }

  @Mutation(() => Todo!)
  async createTodo(@Args('input') input: TodoInput) {
    return await this.todoService.create(input);
  }

  @Mutation(() => String!)
  async removeTodo(@Args('id') id: string) {
    return await this.todoService.remove(id);
  }
}
