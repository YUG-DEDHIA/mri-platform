import React from 'react';
import VideoPlayer from './VideoPlayer';

const VideoReviewContainer = () => {
  const video = {
    url: 'https://videos.pexels.com/video-files/5724101/5724101-uhd_2732_1440_25fps.mp4',
    title: 'Medical Assessment'
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Video Review</h2>
      <VideoPlayer video={video} title="Medical Assessment" />
    </div>
  );
};

export default VideoReviewContainer;
