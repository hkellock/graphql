import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import TodoAdd from './TodoAdd';
import { TodoItem, Todos } from '../types/todo';

const TODO_QUERY = gql`
  query {
    todos {
      id
      title
      description
      completed
    }
  }
`;

const Todo: React.FC = () => {
  const { loading, error, data } = useQuery<Todos>(TODO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error!</p>;

  const handleToggle = (todo: TodoItem) => () => {
    console.log(`${todo.id} toggled`);
  };

  const handleEdit = (todo: TodoItem) => () => {
    console.log(`${todo.id} edit requested`);
  };

  return (
    <>
      <List>
        {data.todos.map((todo) => (
          <ListItem key={todo.id} button onClick={handleToggle(todo)}>
            <ListItemIcon>
              <Checkbox checked={todo.completed} />
            </ListItemIcon>
            <ListItemText primary={todo.title} secondary={todo.description} />
            <ListItemSecondaryAction onClick={handleEdit(todo)}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TodoAdd />
    </>
  );
};

export default Todo;
