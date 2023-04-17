// this component will be used as the video watch component

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
  // get the id of the video from the URL
  const { id } = useParams();

  const [videoDetail, setVideoDetail] = useState(null); // for the relevent video
  const [videos, setVideos] = useState(null); // for suggested videos

  // fetch data as soon as item in dependency array updated
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));  // seVideoDetail() to the first item we recieved

    // fetch suggested videos to the relevent video, get only videos (not related channels)
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  if(!videoDetail?.snippet){
    return 'Loading...';
  }

  // destructer videoDetail object to 2 levels // extract snippet from video detail and, from snippet extract title
  //  = {} will assign empty objects to the destructured variables in case videoDetail is null or undefined
  const { snippet: { title, channelId, channelTitle } = {} , statistics: { viewCount, likeCount } = {} } = videoDetail || {};  // only destructure the videoDetail object if it is not null

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player" controls />
            {/* will only render the <Typography> component if the videoDetail variable is not null */}
            {videoDetail && (
              <Box>
                <Typography variant='h6' color='#fff' fontWeight='bold' p={2}>
                  {title}
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
                  <Link to={`/channel/${channelId}`}>
                  <Typography sx={{ fontSize: {sm: 'subtitle1', md: 'body1'}, color: "#fff", opacity: 0.8 }}>                      {channelTitle}
                      <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                    </Typography>
                  </Link>
                  <Stack direction='row' gap="20px" alignItems="center">
                    <Typography variant='body2' sx={{ opacity: 0.6 }}>
                      {parseInt(viewCount).toLocaleString()} views
                    </Typography>
                    <Typography variant='body2' sx={{ opacity: 0.6 }}>
                      {parseInt(likeCount).toLocaleString()} likes
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>

        {/* suggested videos */}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction='column' />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail