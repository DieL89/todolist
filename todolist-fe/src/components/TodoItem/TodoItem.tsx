import React, { useState, useRef, useEffect } from "react";
import { GoCheck } from 'react-icons/go';
import { MdModeEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { ITodoItemProps } from "../../types/interfaces";
import './todo-item.scss';

function TodoItem({todo, onToggle, onEdit, onDelete}: ITodoItemProps): JSX.Element {
  const [editMode, toggleEditMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(todo.message);

  const editInputElem = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && editInputElem && editInputElem.current) {
      editInputElem.current.focus();
    }
  }, [editMode]);

  const editClickHandler = (): void => {
    if (editMode && message !== todo.message) {
      onEdit(todo._id, message);
    }

    toggleEditMode(!editMode);
  }

  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const classList: string[] = ['todo-list__item__message'];

  if (todo.completed) {
    classList.push('todo-list__item__message_completed');
  }

  return (
    <li className="todo-list__item-wrapper">
      <div className="todo-list__item">
        <button onClick={() => onToggle(todo._id, !todo.completed)} className="todo-list__item__completed">
          {todo.completed &&
            <GoCheck className="todo-list__item__completed__icon" />
          }
        </button>
        {!editMode
          ? <div className={classList.join(' ')}>
              {todo.message}
            </div>
          : <input
              onChange={messageChangeHandler}
              value={message}
              ref={editInputElem}
              className="todo-list__item__edit-input"
              type="text"
              placeholder="Edit TODO message"
            />
        }
      </div>

      <div className="todo-list__item__buttons">
        <button onClick={editClickHandler} className="btn todo-list__item__btn-edit" type="button">
          {!editMode
            ? <MdModeEdit className="btn__icon" />
            : <GoCheck className="btn__icon" />
          }
        </button>
        <button onClick={() => onDelete(todo._id)} className="btn todo-list__item__btn-delete" type="button">
          <AiOutlineDelete className="btn__icon" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
