import React from 'react';
import { Avatar, Box } from '@mui/material';
import { motion } from 'motion/react';
import { Dog } from '../types';

const AnimatedAvatar = motion.create(Avatar);

const GrowingAvatar = ({
  dog,
  isRowHovered = false,
}: {
  dog: Dog;
  isRowHovered?: boolean;
}) => {
  return (
    <Box sx={{ position: 'relative', width: 24, height: 24 }}>
      <AnimatedAvatar
        alt={dog.name}
        src={dog.img}
        initial={{ width: 24, height: 24 }}
        animate={
          isRowHovered
            ? {
                width: 100,
                height: 100,
                x: -15,
                y: -35,
                zIndex: 10,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        whileHover={{
          width: 100,
          height: 100,
          x: -15,
          y: -35,
          zIndex: 10,
          transition: { duration: 0.2 },
        }}
        sx={{ position: 'absolute' }}
      />
    </Box>
  );
};

export default GrowingAvatar;
