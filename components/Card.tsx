import classNames from 'classnames';
import React, { FC } from 'react';

type CardProps = {
  color?: 'red' | 'green' | 'purple' | 'gray' | 'yellow' | 'brown' | 'black' | 'lightBlue' | 'blue';
};

export const Card: FC<CardProps> = ({ children, color = null }) => {
  return (
    <div
      className={classNames(
        'rounded-2xl border border-gray-200 p-4 aspect-square transition-all flex justify-between flex-col shadow-sm',
        'hover:scale-105 hover:shadow-md hover:bg-opacity-10',
        {
          'bg-gray-50': !color,
          'bg-red-50': color === 'red',
          'bg-green-50': color === 'green',
          'bg-purple-100': color === 'purple',
          'bg-slate-100': color === 'gray',
          'bg-yellow-100': color === 'yellow',
          'bg-brown-100': color === 'brown',
          'bg-gray-400': color === 'black',
          'bg-lightblue-100': color === 'lightBlue',
          'bg-blue-100': color === 'blue'
        }
      )}>
      {children}
    </div>
  );
};
