import React from 'react';
import { TableCell } from '@mui/material';
import { Dog } from '../types';
import AnimatedTableRow from './AnimatedTableRow';
import GrowingAvatar from './GrowingAvatar';
import { useState } from 'react';

interface DogRowProps {
  dog: Dog;
  index: number;
}

const DogRow = ({ dog, index }: DogRowProps) => {
  const [isRowHovered, setIsRowHovered] = useState(false);

  return (
    <AnimatedTableRow
      delay={index}
      onHoverStart={() => setIsRowHovered(true)}
      onHoverEnd={() => setIsRowHovered(false)}
    >
      <TableCell>
        <GrowingAvatar dog={dog} isRowHovered={isRowHovered} />
      </TableCell>
      <TableCell>{dog.name}</TableCell>
      <TableCell>{dog.breed}</TableCell>
      <TableCell>{dog.age}</TableCell>
      <TableCell>{dog.zip_code}</TableCell>
    </AnimatedTableRow>
  );
};

export default DogRow;
