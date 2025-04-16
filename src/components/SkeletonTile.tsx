import React from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import { motion } from 'motion/react';

const AnimatedBox = motion.create(Box);

const SkeletonTile = () => {
  return (
    <AnimatedBox
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      sx={{
        width: {
          xs: 'calc(50% - 16px)',
          sm: 'calc(33.333% - 16px)',
          md: 'calc(25% - 16px)',
          lg: 'calc(20% - 16px)',
        },
        minWidth: '180px',
        maxWidth: '50%',
      }}
    >
      <Card>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: 200,
            backgroundColor: '#f0f0f0',
          }}
          animation="wave"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Skeleton
              variant="text"
              width="100%"
              height={32}
              animation="wave"
            />
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Breed:{' '}
            <Skeleton
              variant="text"
              width="70%"
              height={24}
              animation="wave"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Age:{' '}
            <Skeleton
              variant="text"
              width="30%"
              height={24}
              animation="wave"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location:{' '}
            <Skeleton
              variant="text"
              width="40%"
              height={24}
              animation="wave"
              sx={{ ml: 1 }}
            />
          </Typography>
        </CardContent>
      </Card>
    </AnimatedBox>
  );
};

export default SkeletonTile;
