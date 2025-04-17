import React, { useMemo } from 'react';
import { useMatchDogResult } from '../queries/dogs';
import { useDogsContext } from '../context/DogsContext';
import DogTile from '../components/DogTile';
import EmptyState from '../components/common/EmptyState';
import { Dog } from '../types';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';

const AnimatedTypography = motion(Typography);
const AnimatedBox = motion(Box);

const MatchTab = () => {
  const { data, isPending } = useMatchDogResult();
  const { favoriteDogs } = useDogsContext();

  const matchedDog = useMemo(() => {
    return data && favoriteDogs[data] ? favoriteDogs[data] : ({} as Dog);
  }, [data, favoriteDogs]);

  return data && !isPending ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      gap={4}
    >
      <AnimatedTypography
        variant="h4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        color="#7575D1"
      >
        Congratulations! You've been matched with a perfect pup!
      </AnimatedTypography>

      <AnimatedBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <DogTile dog={matchedDog} isMatch={true} />

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontStyle: 'italic',
            color: 'text.secondary',
            maxWidth: '600px',
          }}
        >
          {`${matchedDog.name} is excited to meet you!`}
        </Typography>
      </AnimatedBox>
    </Box>
  ) : (
    <EmptyState label="No match found yet. View your favorite pups to find a match!" />
  );
};

export default MatchTab;
