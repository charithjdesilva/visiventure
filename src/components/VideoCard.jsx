import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

// is going to be used incase we cannot fetch data for some of the video we recieve from API
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle  } from '../utils/constants';

const VideoCard = ( { video: { id: { videoId } , snippet }} ) => {
  return (
    <Card sx={{ width: { md: '320px', xs: '100%' }, boxShadow: 'none', borderRadius: 0, backgroundColor: '#1e1e1e' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <CardMedia
                image = {snippet?.thumbnails?.high?.url}
                alt = {snippet?.title}
                sx={{ width: 358, height: 180 }}
            />
        </Link>
        <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px', maxWidth: '320px', minWidth: '320px' }} >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography variant="body2" fontWeight="bold" color="#fff" sx={{ maxWidth: "92%", wrap: "break-word"}}>
                {/* some titles may be too long */}
                {/* if there is not title, then the demo */}
                {snippet?.title.slice(0, 60)|| demoVideoTitle.slice(0, 60)}
            </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl}>
            <Typography variant="caption" fontWeight="bold" color="gray" sx={{ maxWidth: "90%", wrap: "break-word" }}>
                {/* if snippet has a channelTitle, else demoChannelTitle */}
                {snippet?.channelTitle || demoChannelTitle}
                <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
            </Typography>
        </Link>
        </CardContent>
    </Card>
  )
}

export default VideoCard