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

  return (
    <section className="sm:h-screen flex items-center justify-center text-center bg-gray-900 relative overflow-hidden">
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
      />
    </section>
  );
}

export default HeroSection;