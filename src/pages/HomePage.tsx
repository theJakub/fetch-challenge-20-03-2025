import React, { useCallback } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { Home, Pets, Star } from '@mui/icons-material';
import { TabContext } from '@mui/lab';
import SearchPupsTab from './SearchPupsTab';
import FavoritePupsTab from './FavoritePupsTab';
import MatchTab from './MatchTab';
import { useNavigate, useParams } from 'react-router-dom';

export type TabsType = 'search' | 'favorites' | 'match';

const HomePage = ({ activeTab }: { activeTab: TabsType }) => {
  const navigate = useNavigate();
  const { filters } = useParams();

  const handleChangeTab = useCallback(
    (_event: React.SyntheticEvent, newValue: TabsType) => {
      if (newValue === 'search') {
        navigate(filters ? `/search/${filters}` : '/search');
      } else {
        navigate(`/${newValue}`);
      }
    },
    [filters, navigate],
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
          <TabContext value={activeTab}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleChangeTab}>
                  <Tab
                    label={
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Pets sx={{ marginRight: '8px' }} />
                        Search Pups
                      </Typography>
                    }
                    value={'search'}
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
                    value={'favorites'}
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
                    value={'match'}
                  />
                </Tabs>
              </Box>
              <TabPanel value={'search'}>
                <SearchPupsTab />
              </TabPanel>
              <TabPanel value={'favorites'}>
                <FavoritePupsTab />
              </TabPanel>
              <TabPanel value={'match'}>
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
