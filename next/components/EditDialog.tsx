import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Send as SendIcon,
} from '@material-ui/icons';
import { Todo as TodoItem, TodoInput, useSaveTodoMutation } from '../types/generated-types-and-hooks';

type EditDialogProps = {
  todo?: TodoItem;
  setTodo: Dispatch<SetStateAction<TodoItem | undefined>>;
}

const EditDialog: React.FC<EditDialogProps> = ({ todo, setTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(todo?.title ?? '');
    setDescription(todo?.description ?? '');
  }, [todo]);

  const [saveTodo, { loading, error, data }] = useSaveTodoMutation();

  const handleClose = () => {
    setTodo(undefined);
  };

  const handleSave = () => {
    if (!todo) {
      throw new Error('Unknown error while saving todo item');
    }
    const editedTodo: TodoInput = {
      id: todo.id,
      title,
      description,
      completed: todo.completed
    }
    saveTodo({ variables: { todo: editedTodo } });
    handleClose();
  };

  if (loading) return <p>Saving todo...</p>;
  if (error) return <p>Error while saving todo: {error.message}</p>;

  return (
    <Dialog open={Boolean(todo)} onClose={handleClose}>
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
        <Button color="primary" onClick={handleSave}>
          <SendIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
