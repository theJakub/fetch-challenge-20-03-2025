import React, { useMemo } from 'react';
import { Dog } from '../types';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useDogsContext } from '../context/DogsContext';
import { Star } from '@mui/icons-material';
import PassiveButton from './common/PassiveButton';

const AnimatedBox = motion.create(Box);

const DogTile = ({ dog }: { dog: Dog }) => {
  const { favoriteDogs, handleAddFavoriteDog, handleRemoveFavoriteDog } =
    useDogsContext();
  const isFavorite = useMemo(
    () => favoriteDogs[dog.id],
    [dog.id, favoriteDogs],
  );

  return (
    <AnimatedBox
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      sx={{
        width: {
          xs: 'calc(50% - 16px)',
          sm: 'calc(33.333% - 16px)',
          md: 'calc(25% - 16px)',
          lg: 'calc(20% - 16px)',
        },
        minWidth: '180px',
        maxWidth: '50%',
        position: 'relative',
      }}
    >
      {isFavorite && (
        <Star
          sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            color: '#FFD700',
            zIndex: 1,
            height: '32px',
            width: '32px',
          }}
        />
      )}
      <Card>
        <CardMedia
          sx={{
            width: '100%',
            height: '200px',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
          }}
          component="img"
          image={dog.img}
          alt={dog.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dog.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Breed: {dog.breed}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Age: {dog.age} years
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {dog.zip_code}
          </Typography>
          {isFavorite ? (
            <PassiveButton onClick={() => handleRemoveFavoriteDog(dog.id)}>
              Remove from favorites
            </PassiveButton>
          ) : (
            <PassiveButton onClick={() => handleAddFavoriteDog(dog)}>
              Add to favorites
            </PassiveButton>
          )}
        </CardContent>
      </Card>
    </AnimatedBox>
  );
};

export default DogTile;
