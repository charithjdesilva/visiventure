import React from 'react';
import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from './';

const Videos = ({ videos, direction }) => {
  // if videos array is empty
  if (!videos?.length) {
    return 'Loading...';
  }

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="center" gap={2}>
    {/* direction={direction || "row"} means if direction was passed in as a prop us it, else use row */}
      {videos.map((item, index) => (
        <Box key={index}>
          {/* check if it is a profile or just a video */}
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos