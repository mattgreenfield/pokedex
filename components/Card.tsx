import classNames from 'classnames';
import React, { FC } from 'react';

type CardProps = {
  color?: 'red' | 'green' | 'purple' | 'gray' | 'yellow' | 'brown' | 'black' | 'lightBlue' | 'blue' | 'lime';
};

export const Card: FC<CardProps> = ({ children, color = null }) => {
  return (
    <div
      className={classNames(
        'rounded-2xl border border-gray-200 aspect-square transition-all flex justify-between flex-col shadow-sm overflow-hidden',
        'hover:scale-105 hover:shadow-md hover:bg-opacity-90',
        {
          'bg-gray-50': !color,
          'bg-red-500': color === 'red',
          'bg-green-500': color === 'green',
          'bg-lime-500': color === 'lime',
          'bg-blue-500': color === 'blue',
          'bg-purple-500': color === 'purple',
          'bg-slate-500': color === 'gray',
          'bg-yellow-500': color === 'yellow',
          'bg-stone-500': color === 'brown',
          'bg-gray-400': color === 'black',
          'bg-sky-500': color === 'lightBlue',
        }
      )}
    >
      {children}
    </div>
  );
};
