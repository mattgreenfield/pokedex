import React, { FC, ReactNode } from 'react';

type ListProps = {
  render: (item: any) => ReactNode;
  items: Array<any>;
  key: string;
};

export const List: FC<ListProps> = ({ render, items, key }) => {
  return (
    <ol className='grid grid-cols-8 gap-3'>
      {items.map(item => (
        <li key={item[key]}>{render(item)}</li>
      ))}
    </ol>
  );
};
