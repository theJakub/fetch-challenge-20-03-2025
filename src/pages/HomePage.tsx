import React, { useCallback, useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { Home, Pets, Star } from '@mui/icons-material';
import { TabContext } from '@mui/lab';
import SearchPupsTab from './SearchPupsTab';
import FavoritePupsTab from './FavoritePupsTab';
import MatchTab from './MatchTab';

const HomePage = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleChangeTab = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    [],
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
          <Typography
            align="center"
            sx={{ borderBottom: '1px solid black', paddingBottom: '8px' }}
            variant="h3"
          >
            Find Your Perfect Pup!
          </Typography>
          <TabContext value={tabValue}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChangeTab}>
                  <Tab
                    label={
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Pets sx={{ marginRight: '8px' }} />
                        Search Pups
                      </Typography>
                    }
                  />
                  <Tab
                    label={
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Star sx={{ marginRight: '8px' }} />
                        Favorites
                      </Typography>
                    }
                  />
                  <Tab
                    label={
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Home sx={{ marginRight: '8px' }} />
                        Match
                      </Typography>
                    }
                  />
                </Tabs>
              </Box>
              <TabPanel value={0}>
                <SearchPupsTab />
              </TabPanel>
              <TabPanel value={1}>
                <FavoritePupsTab />
              </TabPanel>
              <TabPanel value={2}>
                <MatchTab />
              </TabPanel>
            </Box>
          </TabContext>
        </Paper>
      </Box>
    </>
  );
};

export default HomePage;
