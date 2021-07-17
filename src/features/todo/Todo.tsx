import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTodo,
  removeTodo,
  editTodoText,
  toggleTodo,
  selectTodos,
} from './todoSlice';
import { TodoItem } from './TodoItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    margin: theme.spacing(1),
  },
}));

export function Todo() {
  const classes = useStyles();
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const input = React.createRef<HTMLInputElement>();
  const handleSubmitNewTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (input.current) {
      const todoText = input.current.value;
      if (todoText) {
        dispatch(addTodo(todoText));
        input.current.value = '';
      }
    }
  };

  return (
    <div className={classes.root}>
      <h1>Todos</h1>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitNewTodo}
      >
        <TextField
          inputRef={input}
          id="new-todo"
          label="What needs to be done?"
          fullWidth={true}
        />
      </form>
      <List>
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              labelId={`checkbox-list-label-${index}`}
              onToggle={() => dispatch(toggleTodo(index))}
              onDelete={() => dispatch(removeTodo(index))}
              onEditText={(text) => dispatch(editTodoText([index, text]))}
            />
          );
        })}
      </List>
    </div>
  );
}
