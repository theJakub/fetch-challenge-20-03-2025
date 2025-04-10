import React, { useState } from 'react';
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
import { useDogsContext } from '../context/DogsContext';
import GrowingAvatar from '../components/GrowingAvatar';

const HomePage: React.FC = () => {
  const { dogs, searchResult } = useDogsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<keyof Dog>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (property: keyof Dog) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper style={{ padding: '20px' }}>
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
            <MenuItem value="all">Search all</MenuItem>
            <MenuItem value="breeds">Search breeds</MenuItem>
            <MenuItem value="zipCodes">Search zip Codes</MenuItem>
            <MenuItem value="ageMin">Search minimum Age</MenuItem>
            <MenuItem value="ageMax">Search maximum Age</MenuItem>
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
              <TableCell />
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
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'zip_code'}
                  direction={orderBy === 'zip_code' ? order : 'asc'}
                  onClick={() => handleSort('zip_code')}
                >
                  Zip Code
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dogs?.map((dog, index) => (
              <TableRow key={index}>
                <TableCell>
                  <GrowingAvatar dog={dog} />
                </TableCell>
                <TableCell>{dog.name}</TableCell>
                <TableCell>{dog.breed}</TableCell>
                <TableCell>{dog.age}</TableCell>
                <TableCell>{dog.zip_code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={searchResult?.total || 0}
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
