import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  completed: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: TodoInput;
};

export type TodoInput = {
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  completed: Scalars['Boolean'];
};

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'completed'>
  )> }
);

export type SaveTodoMutationVariables = Exact<{
  todo: TodoInput;
}>;


export type SaveTodoMutation = (
  { __typename?: 'Mutation' }
  & { createTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'completed'>
  ) }
);


export const TodosDocument = gql`
    query Todos {
  todos {
    id
    title
    description
    completed
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(baseOptions?: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        return Apollo.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
      }
export function useTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosQueryResult = Apollo.QueryResult<TodosQuery, TodosQueryVariables>;
export const SaveTodoDocument = gql`
    mutation saveTodo($todo: TodoInput!) {
  createTodo(input: $todo) {
    id
    title
    description
    completed
  }
}
    `;
export type SaveTodoMutationFn = Apollo.MutationFunction<SaveTodoMutation, SaveTodoMutationVariables>;

/**
 * __useSaveTodoMutation__
 *
 * To run a mutation, you first call `useSaveTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTodoMutation, { data, loading, error }] = useSaveTodoMutation({
 *   variables: {
 *      todo: // value for 'todo'
 *   },
 * });
 */
export function useSaveTodoMutation(baseOptions?: Apollo.MutationHookOptions<SaveTodoMutation, SaveTodoMutationVariables>) {
        return Apollo.useMutation<SaveTodoMutation, SaveTodoMutationVariables>(SaveTodoDocument, baseOptions);
      }
export type SaveTodoMutationHookResult = ReturnType<typeof useSaveTodoMutation>;
export type SaveTodoMutationResult = Apollo.MutationResult<SaveTodoMutation>;
export type SaveTodoMutationOptions = Apollo.BaseMutationOptions<SaveTodoMutation, SaveTodoMutationVariables>;