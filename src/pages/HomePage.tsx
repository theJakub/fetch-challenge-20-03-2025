import React, { useCallback, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useDogsContext } from '../context/DogsContext';
import TableIdea from '../components/TableIdea';
import { GridView, List } from '@mui/icons-material';
import PassiveButton from '../components/PassiveButton';
import TilesIdea from '../components/TilesIdea';

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

  const [displayTable, setDisplayTable] = useState<boolean>(false);

  const handleSort = useCallback(() => {
    setFilters({
      sort: filters.sort?.includes('asc') ? 'breed:desc' : 'breed:asc',
    });
  }, [filters.sort, setFilters]);

  const handleBreedFilter = useCallback(
    (breeds: string[]) => {
      setFilters({ breeds });
    },
    [setFilters],
  );

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <Box display={'flex'} justifyContent={'flex-end'} gap={'8px'}>
        <PassiveButton
          highlight={displayTable}
          onClick={() => setDisplayTable(true)}
        >
          <List />
        </PassiveButton>
        <PassiveButton
          highlight={!displayTable}
          onClick={() => setDisplayTable(false)}
        >
          <GridView />
        </PassiveButton>
      </Box>
      {displayTable ? (
        <TableIdea
          {...{
            breeds,
            dogs,
            filters,
            handleBreedFilter,
            handleChangePage,
            handleSort,
            isLoading,
            page,
            total,
          }}
        />
      ) : (
        <TilesIdea
          {...{
            breeds,
            dogs,
            filters,
            handleBreedFilter,
            handleChangePage,
            handleSort,
            isLoading,
            page,
            total,
          }}
        />
      )}
    </Paper>
  );
};

export default HomePage;
