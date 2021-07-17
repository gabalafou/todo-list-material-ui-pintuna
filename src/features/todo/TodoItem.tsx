import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import styles from './TodoItem.module.css';
import type { Todo } from './todoTypes';

interface TodoItemProps {
  todo: Todo;
  labelId: string;
  onToggle: () => void;
  onDelete: () => void;
  onEditText: (text: string) => void;
}

export function TodoItem(props: TodoItemProps) {
  const { todo, labelId, onToggle, onDelete, onEditText } = props;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ListItem role={undefined} dense button>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={onToggle}
          color="default"
        />
      </ListItemIcon>
      {isEditing ? (
        <TextField
          value={todo.text}
          onChange={(event) => onEditText(event.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <ListItemText
          className={`${todo.completed ? styles.completed : ''}`}
          id={labelId}
          primary={todo.text}
          onDoubleClick={() => setIsEditing(true)}
        />
      )}
      <ListItemSecondaryAction onClick={onDelete}>
        <IconButton edge="end" aria-label="comments">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
