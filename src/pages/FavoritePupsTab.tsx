import React, { useMemo } from 'react';
import { useDogsContext } from '../context/DogsContext';
import { Box, Button } from '@mui/material';
import { AnimatePresence } from 'motion/react';
import DogTile from '../components/DogTile';
import EmptyState from '../components/common/EmptyState';
import { useMatchDog } from '../queries/dogs';

const FavoritePupsTab = () => {
  const { favoriteDogs } = useDogsContext();
  const { mutate } = useMatchDog();

  const favoritesArray = useMemo(
    () => Object.values(favoriteDogs),
    [favoriteDogs],
  );

  const handleMatch = () => {
    const favoriteIds = Object.keys(favoriteDogs);
    mutate(favoriteIds);
  };

  return (
    <Box display={'flex'} flexWrap={'wrap'} gap={'16px'} mr={'-16px'}>
      <AnimatePresence>
        {favoritesArray.length ? (
          <Box>
            {favoritesArray.map((dog) => (
              <DogTile key={dog.id} dog={dog} />
            ))}
            <Button onClick={handleMatch} variant="contained" color="success">
              Find your match!
            </Button>
          </Box>
        ) : (
          <EmptyState label="No favorite pups yet. Search for pups and add some to your favorites!" />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default FavoritePupsTab;
