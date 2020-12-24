import React, { ReactNode } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  PropTypes,
} from '@material-ui/core';

type DialogButtonProps = {
    color: PropTypes.Color;
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    icon: ReactNode;
    text: string;
}

const useStyles = makeStyles((theme) => 
  createStyles({
    button: {
      margin: theme.spacing(2)
    }
  })
);

const DialogButton: React.FC<DialogButtonProps> = ({ color, onClick, icon, text }) => {
  const classes = useStyles();

  return (
    <Button 
      variant="contained" 
      color={color} 
      className={classes.button}
      onClick={onClick} 
      startIcon={icon}
    >
      {text}
    </Button>
  );
};

export default DialogButton;
