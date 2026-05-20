/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo, TodoStatus, TodoStatusMap } from './types/Todo';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { ErrorNotification } from './components/ErrorNotification';
import { ToggleAllButton } from './components/ToggleAllButton';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<TodoStatus>(
    TodoStatusMap.All,
  );

  useEffect(() => {
    getTodos()
      .then(todos => setTodoList(todos))
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const todoListActive = todoList.filter(todo => !todo.completed);
  const todoListCompleted = todoList.filter(todo => todo.completed);

  const todoListFiltered =
    filterStatus === TodoStatusMap.Active
      ? todoListActive
      : filterStatus === TodoStatusMap.Completed
        ? todoListCompleted
        : todoList;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todoList.length && <ToggleAllButton />}
          <AddTodo />
        </header>

        <TodoList todoList={todoListFiltered} />

        {!!todoList.length && (
          <TodoFooter
            activeCount={todoListActive.length}
            completedCount={todoListCompleted.length}
            status={filterStatus}
            onChangeFilterStatus={setFilterStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
