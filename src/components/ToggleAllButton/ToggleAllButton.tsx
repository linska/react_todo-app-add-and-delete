import React from 'react';
import cn from 'classnames';

export const ToggleAllButton: React.FC = () => {
  return (
    <button
      type="button"
      className={cn('todoapp__toggle-all', {
        active: false,
      })}
      data-cy="ToggleAllButton"
    />
  );
};
