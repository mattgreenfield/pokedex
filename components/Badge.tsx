import React, { FC } from 'react';

type BadgeProps = {};

export const Badge: FC<BadgeProps> = ({ children }) => {
  return <div className="bg-gray-100 px-2 py-1 text-gray-500 rounded leading-none font-medium">{children}</div>;
};
