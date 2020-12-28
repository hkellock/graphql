import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { Cancel, Delete, Save } from '@material-ui/icons';
import DialogButton from './DialogButton';
import { editTodo, removeTodo } from '../lib/apolloClient';
import {
  Todo as TodoItem,
  TodoInput,
  useRemoveTodoMutation,
  useSaveTodoMutation,
} from '../types/generated-types-and-hooks';

type EditDialogProps = {
  todo?: TodoItem;
  setTodo: Dispatch<SetStateAction<TodoItem | undefined>>;
};

const EditDialog: React.FC<EditDialogProps> = ({ todo, setTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(todo?.title ?? '');
    setDescription(todo?.description ?? '');
  }, [todo]);

  const [saveMutation, { loading, error }] = useSaveTodoMutation();
  const [removeMutation] = useRemoveTodoMutation();

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
      completed: todo.completed,
    };
    const input: TodoInput = { ...editedTodo };
    saveMutation({
      variables: { todo: input },
      update: () => editTodo(editedTodo),
    });
    handleClose();
  };

  const handleRemove = () => {
    if (!todo) {
      throw new Error('Unknown error while removing todo item.');
    }
    removeMutation({
      variables: { id: todo.id },
      update: () => removeTodo(todo),
    });
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
        <DialogButton
          color="secondary"
          onClick={handleRemove}
          icon={<Delete />}
          text="Remove"
        />
        <div style={{ flex: '1 0 0' }} />
        <DialogButton
          color="default"
          onClick={handleClose}
          icon={<Cancel />}
          text="Cancel"
        />
        <DialogButton
          color="primary"
          onClick={handleSave}
          icon={<Save />}
          text="Save"
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
