import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useReactiveVar } from '@apollo/client';
import { Fab, List } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import {
  Todo as TodoItem,
  TodoInput,
  useSaveTodoMutation,
  useTodosQuery,
} from '../types/generated-types-and-hooks';
import EditDialog from './EditDialog';
import TodoListItem from './TodoListItem';
import { editTodo, todosVar } from '../lib/apolloClient';

const Todo: React.FC = () => {
  const { loading, error, data } = useTodosQuery();
  const todos = useReactiveVar(todosVar);

  useEffect(() => {
    if (data?.todos) {
      todosVar(data.todos);
    }
  }, [data?.todos]);

  const [saveMutation] = useSaveTodoMutation();
  const [selectedTodo, setSelectedTodo] = React.useState<TodoItem | undefined>(
    undefined,
  );

  const handleAddStart = () => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      title: '',
      completed: false,
    };
    setSelectedTodo(newTodo);
  };

  const handleEditStart = (todo: TodoItem) => () => setSelectedTodo(todo);

  const handleToggle = (todo: TodoItem) => () => {
    const toggledItem: TodoItem = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: !todo.completed,
    };
    const input: TodoInput = { ...toggledItem };
    saveMutation({
      variables: { todo: input },
      update: () => editTodo(toggledItem),
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <List>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleToggle={handleToggle}
            handleEditStart={handleEditStart}
          />
        ))}
      </List>
      <Fab color="primary" onClick={handleAddStart}>
        <AddIcon />
      </Fab>
      <EditDialog todo={selectedTodo} setTodo={setSelectedTodo} />
    </>
  );
};

export default Todo;
