import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  // get id from the URL using useParams
  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState(null);
  
  const [videos, setVideos] = useState([]);
  console.log(channelDetail, videos);

  // going to re-render when Id changes
  useEffect(() => {
    // fetch channel details to the channel id
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));   // if above call back succeed setChannelDetail

    // fetch videos belonging to the channel id
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(225deg, rgba(225,89,32,1) 0%, rgba(2,0,36,1) 100%)',
            zIndex: 8,
            height: '300px'
          }}
        />
        {/* below we are also parsing the marginTop property as props */}
        <ChannelCard channelDetail={channelDetail} marginTop='-95px' />
      </Box>

      {/* for videos */}
      <Box display="flex" p='2'>
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail