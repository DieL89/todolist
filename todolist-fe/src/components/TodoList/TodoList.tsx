import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { ITodoListProps, ITodoModel } from "../../types/interfaces";
import './todo-list.scss';

function TodoList({todos, onToggle, onEdit, onDelete}: ITodoListProps): JSX.Element {
  return (
    <ul className="todo-list">
      {todos.map((todo: ITodoModel) => (
        <TodoItem
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          key={todo._id}
        />
      ))}
    </ul>
  );
}

export default TodoList;
