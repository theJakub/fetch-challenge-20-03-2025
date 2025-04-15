import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import MultiSelect from './MultiSelect';
import { AnimatePresence } from 'motion/react';
import SkeletonRow from './SkeletonRow';
import DogRow from './DogRow';
import { Dog, DogFilters } from '../types';

const TableIdea = ({
  breeds,
  dogs,
  filters,
  handleBreedFilter,
  handleChangePage,
  handleSort,
  isLoading,
  page,
  total,
}: {
  breeds: string[];
  dogs: Dog[];
  filters: DogFilters;
  handleBreedFilter: (breeds: string[]) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleSort: () => void;
  isLoading: boolean;
  page: number;
  total: number;
}) => (
  <>
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
            <TableCell>
              <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active
                direction={filters.sort?.includes('asc') ? 'asc' : 'desc'}
                onClick={() => handleSort()}
              >
                <Typography sx={{ fontWeight: 'bold' }}>Breed</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold' }}>Age</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold' }}>Zip Code</Typography>
            </TableCell>
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
  </>
);

export default TableIdea;
