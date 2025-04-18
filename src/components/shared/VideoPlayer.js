import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  posterImage, 
  autoplay = false, 
  controls = true, 
  loop = false
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // Handle video metadata loaded
  const handleLoaded = () => {
    setIsLoaded(true);
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  // Handle video ended
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (loop && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5 
      } 
    }
  };

  // Extract video ID from YouTube URL if it is a YouTube video
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(videoUrl);

  return (
    <motion.div 
      className="relative w-full rounded-lg overflow-hidden shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {youtubeId ? (
        // YouTube Embed
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}`}
            title={title || "Video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ) : (
        // Native Video Player
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            poster={posterImage}
            onLoadedMetadata={handleLoaded}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={controls}
            autoPlay={autoplay}
            loop={loop}
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!controls && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/50 rounded-full p-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </motion.div>
              )}
            </div>
          )}

          {!controls && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}

      {title && (
        <div className="p-4 bg-background">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
