import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from './';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {setVideos(data.items)})
  }, [searchTerm]);

  return (
    <Stack sx={{ flexDirection: "column" }}>
      <Box>
        <Typography variant='h4' fontWeight="bold" mb={2} pl={2} sx={{ color: 'white', display: 'block' }}>
          Search Result for: <span style={{ color: '#e1592e' }}>
            {searchTerm}
          </span> videos
        </Typography>
      </Box>

      <Box p={{ sx: 0, md: 2 }} sx={{ overflowY:'auto', height: '90vh' }}>
        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default SearchFeed