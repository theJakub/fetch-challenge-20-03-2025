import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Box,
} from '@mui/material';
import { useDogsContext } from '../context/DogsContext';
import GrowingAvatar from '../components/GrowingAvatar';
import SkeletonRow from '../components/SkeletonRow';
import { AnimatePresence } from 'motion/react';
import AnimatedTableRow from '../components/AnimatedTableRow';
import MultiSelect from '../components/MultiSelect';
import DogRow from '../components/DogRow';

const HomePage = () => {
  const {
    breeds,
    dogs,
    filters,
    handleChangePage,
    isLoading,
    page,
    setFilters,
    total,
  } = useDogsContext();

  const handleSort = () => {
    setFilters({
      sort: filters.sort?.includes('asc') ? 'breed:desc' : 'breed:asc',
    });
  };

  const handleBreedFilter = (breeds: string[]) => {
    setFilters({ breeds });
  };

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <Box display="flex" justifyContent={'space-between'}>
        <MultiSelect
          options={breeds}
          defaultSelectedOptions={filters.breeds}
          onBlur={handleBreedFilter}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>
                <TableSortLabel
                  active
                  direction={filters.sort?.includes('asc') ? 'asc' : 'desc'}
                  onClick={() => handleSort()}
                >
                  Breed
                </TableSortLabel>
              </TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Zip Code</TableCell>
            </TableRow>
          </TableHead>
          <AnimatePresence>
            <TableBody>
              {isLoading
                ? Array.from({ length: 15 }).map((_, index) => (
                    <SkeletonRow delay={index} key={index} />
                  ))
                : dogs?.map((dog, index) => (
                    <DogRow key={dog.id} dog={dog} index={index} />
                  ))}
            </TableBody>
          </AnimatePresence>
        </Table>
        <TablePagination
          component="div"
          count={total || 0}
          onPageChange={handleChangePage}
          page={page}
          rowsPerPage={15}
          rowsPerPageOptions={[15]}
        />
      </TableContainer>
    </Paper>
  );
};

export default HomePage;
