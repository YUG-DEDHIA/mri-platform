import React, { useState, useRef } from 'react';
import { Play, Pause, ZoomIn, ZoomOut, FastForward, Rewind, Download } from 'lucide-react';
import VideoAnnotation from './VideoAnnotation';

const VideoPlayer = ({ video, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [zoom, setZoom] = useState(1);

  const togglePlay = () => {
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center"> {/* Centers the video player in the page */}
      <div className="video-container"> {/* Restrict video to this container */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src={video.url}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${zoom})` }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            <VideoAnnotation />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <button onClick={togglePlay} className="p-2 text-white hover:bg-white/20 rounded-full">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 w-full max-w-lg"> {/* Constrains the description width */}
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        
      </div>
    </div>
  );
};

export default VideoPlayer;
