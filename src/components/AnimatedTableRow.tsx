import React, { ReactNode } from 'react';
import { TableRow } from '@mui/material';
import { motion } from 'motion/react';

const MotionTableRow = motion(TableRow);

interface AnimatedTableRowProps {
  children: ReactNode;
  delay?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const AnimatedTableRow = ({
  children,
  delay = 0,
  onHoverEnd,
  onHoverStart,
}: AnimatedTableRowProps) => {
  return (
    <MotionTableRow
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: delay * 0.05,
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
      exit={{
        opacity: 0,
        x: -10,
        transition: { duration: 0.2 },
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
    >
      {children}
    </MotionTableRow>
  );
};

export default AnimatedTableRow;
