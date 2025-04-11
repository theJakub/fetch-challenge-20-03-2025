import React from 'react';
import { Skeleton, TableCell } from '@mui/material';
import AnimatedTableRow from './AnimatedTableRow';

const SkeletonRow = ({ delay = 0 }: { delay: number }) => {
  return (
    <AnimatedTableRow delay={delay}>
      <TableCell>
        <Skeleton
          variant="circular"
          width={24}
          height={24}
          animation="wave"
          sx={{ position: 'absolute' }}
        />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="70%" height={24} animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={30} height={24} animation="wave" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={60} height={24} animation="wave" />
      </TableCell>
    </AnimatedTableRow>
  );
};

export default SkeletonRow;
