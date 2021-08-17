import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import NewTodoForm from '../components/NewTodoForm/NewTodoForm';
import TodoList from '../components/TodoList/TodoList';
import { BaseUrl, JsonContentType, getItemUrl } from '../utils/httpUtils';
import { ITodoModel } from '../types/interfaces';

function TodosPage(): JSX.Element {
  const [todos, setTodos] = useState<ITodoModel[]>([]);

  useEffect(() => {
    const getData: () => Promise<void> = async () => {
      const result: AxiosResponse<any> = await axios.get(BaseUrl);

      setTodos(result.data.data);
    };

    getData();
  }, []);

  const addTodoHandler = (message: string): void => {
    const postData: () => Promise<void> = async () => {
      const result: AxiosResponse<any> = await axios.post(
        BaseUrl,
        JSON.stringify({ message: message.trim(), completed: false }),
        {headers: {'Content-Type': JsonContentType}}
      );

      setTodos(prev => [...prev, result.data ]);
    };
 
    postData();
  };

  const toggleTodoHandler = (id: string, completed: boolean): void => {
    const patchData: () => Promise<void> = async () => {
      await axios.patch(
        getItemUrl(BaseUrl, id),
        JSON.stringify({ completed }),
        {headers: {'Content-Type': JsonContentType}}
      );

      setTodos(prev => prev.map(todo => {
        if (todo._id === id) {
          return { ...todo, completed };
        }

        return todo;
      }));
    };

    patchData();
  };

  const editTodoHandler = (id: string, message: string): void => {
    const editData: () => Promise<void> = async () => {
      await axios.patch(
        getItemUrl(BaseUrl, id),
        JSON.stringify({ message }),
        {headers: {'Content-Type': JsonContentType}}
      );

      setTodos(prev => prev.map(todo => {
        if (todo._id === id) {
          return { ...todo, message: message };
        }

        return todo;
      }));
    };

    editData();
  };

  const deleteTodoHandler = (id: string): void=> {
    const deleteData: () => Promise<void> = async () => {
      await axios.delete(getItemUrl(BaseUrl, id));

      setTodos(prev => prev.filter(todo => todo._id !== id));
    };

    deleteData();
  };

  return (
    <div className="todo">
      <NewTodoForm onAdd={addTodoHandler} />
      <TodoList
        todos={todos}
        onToggle={toggleTodoHandler}
        onEdit={editTodoHandler}
        onDelete={deleteTodoHandler}
      />
    </div>
  );
}

export default TodosPage;
