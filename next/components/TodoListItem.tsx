import React from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { Todo as TodoItem } from '../types/generated-types-and-hooks';

type TodoListItemProps = {
  todo: TodoItem;
  handleToggle: (todo: TodoItem) => any;
  handleEditStart: (todo: TodoItem) => any;
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  handleToggle,
  handleEditStart,
}) => (
  <ListItem button onClick={handleToggle(todo)}>
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
);

export default TodoListItem;
