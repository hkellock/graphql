import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { Todo as TodoItem, TodoInput, useRemoveTodoMutation, useSaveTodoMutation } from '../types/generated-types-and-hooks';

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
  const [removeTodo] = useRemoveTodoMutation();

  const handleClose = () => {
    setTodo(undefined);
  };

  const handleSave = () => {
    if (!todo) {
      throw new Error('Unknown error while saving todo item.');
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

  const handleRemove = () => {
    if (!todo) {
      throw new Error('Unknown error while removing todo item.');
    }
    removeTodo({ variables: { id: todo.id } });
    handleClose();
  }

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
        <Button variant="outlined" color="secondary" onClick={handleRemove}>
          Remove
        </Button>
        <div style={{flex: '1 0 0'}} />
        <Button variant="outlined" color="default" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
