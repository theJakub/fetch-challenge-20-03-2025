import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  TableSortLabel,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { Dog } from '../types';

const HomePage: React.FC = () => {
  const [dogs] = useState<Dog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Dog>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const sessionCookie = document.cookie.split('; ');
    console.log('Cookies', sessionCookie);
  }, []);
  const handleSort = (property: keyof Dog) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDogs = dogs
    .filter(
      (dog) =>
        dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dog.breed.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return b[orderBy] < a[orderBy] ? -1 : 1;
      }
    });

  const paginatedDogs = filteredDogs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography component="h1" variant="h5">
        Pups
      </Typography>

      <Box display="flex" style={{ marginBottom: '20px' }}>
        <FormControl
          variant="outlined"
          style={{
            minWidth: 120,
          }}
        >
          <Select value="all" defaultValue="all">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="breeds">Breeds</MenuItem>
            <MenuItem value="zipCodes">Zip Codes</MenuItem>
            <MenuItem value="ageMin">Minimum Age</MenuItem>
            <MenuItem value="ageMax">Maximum Age</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Search dogs"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          variant="outlined"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'breed'}
                  direction={orderBy === 'breed' ? order : 'asc'}
                  onClick={() => handleSort('breed')}
                >
                  Breed
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? order : 'asc'}
                  onClick={() => handleSort('age')}
                >
                  Age
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDogs.map((dog, index) => (
              <TableRow key={index}>
                <TableCell>{dog.name}</TableCell>
                <TableCell>{dog.breed}</TableCell>
                <TableCell>{dog.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default HomePage;
