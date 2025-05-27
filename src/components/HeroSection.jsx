import React, { useState } from 'react';
import BackgroundImages from './BackgroundImages';
import HeroContent from './HeroContent';
import VideoModal from './VideoModal';

function HeroSection({ showHero, showButtons, openSlider, scrollToGallery }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoError, setVideoError] = useState(null);

  if (!showHero) return null;

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoError(null);
  };

  const handleVideoError = () => {
    setVideoError('Не удалось загрузить видео. Пожалуйста, попробуйте позже.');
  };

  const localHost = process.env.LOCAL_HOST
  // Define video and poster public IDs (these could come from props or a config)
  const videoPublicId = 'https://minsksalonspace.com/images/overview_video.mp4'; // Could be a third-party URL like 'https://example.com/video.mp4'
  const posterPublicId = 'fdnaj1skiohqpipsibbz'; // Could be a third-party URL like 'https://example.com/poster.jpg'

  return (
    <section className="h-screen flex items-center justify-center text-center bg-gray-900 relative overflow-hidden">
      <BackgroundImages />
      <HeroContent
        showButtons={showButtons}
        openSlider={openSlider}
        scrollToGallery={scrollToGallery}
        openVideoModal={openVideoModal}
      />
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoError={videoError}
        handleVideoError={handleVideoError}
        videoPublicId={videoPublicId}
        posterPublicId={posterPublicId}
      />
    </section>
  );
}

export default HeroSection;