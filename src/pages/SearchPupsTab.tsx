import React, { useCallback, useState } from 'react';
import { useDogsContext } from '../context/DogsContext';
import { Box, Button, Grid, TablePagination } from '@mui/material';
import FilterChips from '../components/FilterChips';
import { Tune } from '@mui/icons-material';
import SortDropdown from '../components/SortDropdown';
import { AnimatePresence } from 'motion/react';
import SkeletonTile from '../components/SkeletonTile';
import DogTile from '../components/DogTile';
import FilterDrawer from './FilterDrawer';

const SearchPupsTab = () => {
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
    <Grid spacing="16px" direction={'column'} container>
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
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Grid>
  );
};

export default SearchPupsTab;
