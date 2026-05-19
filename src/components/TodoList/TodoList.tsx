import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface Props {
  todoList?: Todo[];
  onDeleteTodo: (id: Todo['id']) => Promise<void>;
  tempTodo?: Todo | null;
  isDeletingCompletedTodos?: boolean;
}

export const TodoList: React.FC<Props> = ({
  todoList = [],
  onDeleteTodo,
  tempTodo = null,
  isDeletingCompletedTodos = false,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todoList.map(todo => (
          <CSSTransition key={todo.id} timeout={0} classNames="item">
            <TodoItem
              todo={todo}
              onDelete={onDeleteTodo}
              loading={isDeletingCompletedTodos && todo.completed}
            />
          </CSSTransition>
        ))}
        {tempTodo && (
          <CSSTransition key="temp-todo" timeout={0} classNames="temp-item">
            <TodoItem todo={tempTodo} loading={true} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
