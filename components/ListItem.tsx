import React, { FC } from 'react';
import { Card } from './Card';
// import { Badge } from './Badge';

type CardProps = {};

export const ListItem: FC<CardProps> = ({ children }) => {
  return <Card>{children}</Card>;
};
