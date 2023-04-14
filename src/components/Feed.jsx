import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Sidebar, Videos } from './';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {setVideos(data.items)})
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row"} }}>
      <Box sx={{ height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #3d3d3d', px: { sx: 0, md: 2 } }}>
        <Sidebar
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
        />

        <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff' }}>
          Copyright 2022 Charith J De Silva
        </Typography>
      </Box>
      
      <Stack sx={{ flexDirection: "column" }}>
        <Box>
          <Typography variant='h4' fontWeight="bold" mb={2} pl={2} sx={{ color: 'white', display: 'block' }}>
            {selectedCategory} <span style={{ color: '#e1592e' }}>
              Videos
            </span>
          </Typography>
        </Box>

        <Box p={{ sx: 0, md: 2 }} sx={{ overflowY:'auto', height: '90vh' }}>
          <Videos videos={videos} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default Feed