import React from 'react';
import { useMatchDog } from '../queries/dogs';
import { useDogsContext } from '../context/DogsContext';
import DogTile from '../components/DogTile';
import EmptyState from '../components/common/EmptyState';

const MatchTab = () => {
  const { data } = useMatchDog();
  const { favoriteDogs } = useDogsContext();
  console.log(data);
  return data ? (
    <DogTile dog={favoriteDogs[data]} />
  ) : (
    <EmptyState label="No match found yet. View your favorite pups to find a match!" />
  );
};

export default MatchTab;
