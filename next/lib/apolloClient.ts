import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { Todo } from '../types/generated-types-and-hooks';

export const todosVar = makeVar<Todo[]>([]);

export const addTodo = (item: Todo) => todosVar([...todosVar(), item]);

export const editTodo = (item: Todo) =>
  todosVar([...todosVar().filter((t) => t.id !== item.id), item]);

export const removeTodo = (item: Todo) =>
  todosVar([...todosVar().filter((t) => t.id !== item.id)]);

export const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          localTodos: {
            read: todosVar,
          },
        },
      },
    },
  }),
});
