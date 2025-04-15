import React from 'react';
import { Dog } from '../types';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const DogTile = ({ dog }: { dog: Dog }) => {
  return (
    <Box
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default DogTile;
