import React, { FC } from 'react';

type CardProps = {};

export const Card: FC<CardProps> = ({ children }) => {
  return <div className='rounded-2xl bg-gray-400 p-2'>{children}</div>;
};
