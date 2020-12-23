import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Send as SendIcon,
} from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { Todo as TodoItem, useSaveTodoMutation } from '../types/generated-types-and-hooks';

const TodoAdd: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState<string | undefined>(
    undefined,
  );

  const [saveTodo, { loading, error, data }] = useSaveTodoMutation();

  const handleAddStart = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const todo: TodoItem = {
      id: uuidv4(),
      title: title,
      description: description,
      completed: false,
    };
    saveTodo({ variables: { todo } });
    setOpen(false);
  };

  if (loading) return <p>Adding todo...</p>;
  if (error) return <p>Error while adding todo: {error.message}</p>;

  return (
    <>
      <Fab color="primary" onClick={handleAddStart}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            id="title"
            type="text"
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="description"
            type="text"
            fullWidth
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            <CancelIcon />
          </Button>
          <Button color="primary" onClick={handleAdd}>
            <SendIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoAdd;
