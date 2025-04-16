import React, { useCallback, useState } from 'react';
import { Box, Button, Paper, TablePagination } from '@mui/material';
import { useDogsContext } from '../context/DogsContext';
import { Pets, Star, Tune } from '@mui/icons-material';
import PassiveButton from '../components/common/PassiveButton';
import DogTile from '../components/DogTile';
import SkeletonTile from '../components/SkeletonTile';
import { AnimatePresence } from 'motion/react';
import FilterChips from '../components/FilterChips';
import SortDropdown from '../components/SortDropdown';
import FilterDrawer from './FilterDrawer';

const HomePage = () => {
  const {
    dogs,
    handleChangePage: changePage,
    isPending,
    page,
    total,
  } = useDogsContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      changePage(event, newPage);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    },
    [changePage],
  );

  return (
    <>
      <Box paddingBottom={'16px'}>
        <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '20px',
          }}
        >
          <Box display={'flex'} justifyContent={'flex-end'} gap={'8px'}>
            {/* TODO: change these to tabs */}
            <PassiveButton onClick={() => console.log('search all')}>
              <Pets sx={{ marginRight: '8px' }} />
              Search Pups
            </PassiveButton>
            <PassiveButton onClick={() => console.log('favorites')}>
              <Star sx={{ marginRight: '8px' }} />
              Favorite Pups
            </PassiveButton>
          </Box>
          <FilterChips />
          <Box display={'flex'} justifyContent={'space-between'}>
            <Button
              onClick={() => setIsDrawerOpen(true)}
              variant="outlined"
              sx={{
                borderColor: 'rgba(0, 0, 0, 0.6)',
                color: 'rgba(0, 0, 0, 0.6)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              }}
            >
              <Tune />
            </Button>
            <SortDropdown />
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} gap={'16px'} mr={'-16px'}>
            <AnimatePresence>
              {isPending
                ? Array.from({ length: 15 }).map((_, index) => (
                    <SkeletonTile key={index} />
                  ))
                : dogs.map((dog) => <DogTile key={dog.id} dog={dog} />)}
            </AnimatePresence>
          </Box>
          <TablePagination
            component="div"
            count={total || 0}
            onPageChange={handleChangePage}
            page={page}
            rowsPerPage={15}
            rowsPerPageOptions={[15]}
          />
        </Paper>
      </Box>
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default HomePage;
