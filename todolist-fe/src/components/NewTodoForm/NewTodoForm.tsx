import React, { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { NewTodoFormProps } from "../../types/interfaces";
import './new-todo-form.scss';

function NewTodoForm({onAdd}: NewTodoFormProps): JSX.Element {
  const [message, setMessage] = useState<string>('');

  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (validateForm(message)) {
      onAdd(message);
      setMessage('');
    }
  };

  const validateForm = (message: string): boolean => {
    return !!message.trim();
  }

  return (
    <form onSubmit={submitHandler} className="new-todo-form">
      <input
        onChange={messageChangeHandler}
        value={message}
        className="new-todo-form__input"
        type="text"
        placeholder="Enter TODO message"
      />
      <button className="btn new-todo-form__btn-add" type="submit">
        <AiOutlinePlus className="btn__icon" />
      </button>
    </form>
  );
}

export default NewTodoForm;
