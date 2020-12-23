import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Checkbox,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Edit as EditIcon, Add as AddIcon } from '@material-ui/icons';
import { Todo as TodoItem, TodoInput, useSaveTodoMutation, useTodosQuery } from '../types/generated-types-and-hooks';
import EditDialog from './EditDialog';

const Todo: React.FC = () => {
  const { loading, error, data } = useTodosQuery();
  const [saveTodo] = useSaveTodoMutation();
  const [selectedTodo, setSelectedTodo] = React.useState<TodoItem | undefined>(undefined);

  const handleAddStart = () => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      title: '',
      completed: false
    }
    setSelectedTodo(newTodo);
  };

  const handleEditStart = (todo: TodoItem) => () => {
    setSelectedTodo(todo);
  };

  const handleToggle = (todo: TodoItem) => () => {
    const toggledItem: TodoInput = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: !todo.completed
    }
    saveTodo({ variables: { todo: toggledItem } });
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error!</p>;
  return (
    <>
      <List>
        {data.todos.map((todo) => (
          <ListItem key={todo.id} button onClick={handleToggle(todo)}>
            <ListItemIcon>
              <Checkbox checked={todo.completed} />
            </ListItemIcon>
            <ListItemText primary={todo.title} secondary={todo.description} />
            <ListItemSecondaryAction onClick={handleEditStart(todo)}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
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
