import React, { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa'; // Play button icon
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import HeroImage from '../real_estate_hero.svg';
import HeroImageMobile from '../real_estate_hero_mobile.svg';
import MayakMinska from '../mayak_minska.svg';

function HeroSection({ showHero, showButtons, openSlider, scrollToGallery }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // Track modal state
  const [videoError, setVideoError] = useState(null); // Track video load errors
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

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
    <section className="h-screen flex items-center justify-center text-center bg-gray-900 relative overflow-hidden">
      <img
        src={HeroImage}
        className="absolute w-3/4 h-3/4 mx-auto my-auto object-contain opacity-70 animate-moveHorizontal hidden sm:block"
        alt="Премиум коммерческое помещение на Петра Мстиславца 1, Минск"
        loading="lazy"
        style={{ zIndex: 1 }}
      />
      <img
        src={HeroImageMobile}
        className="absolute w-3/4 h-3/4 mx-auto my-auto object-contain opacity-70 animate-moveHorizontal sm:hidden"
        alt="Премиум коммерческое помещение на Петра Мстиславца 1, Минск (мобильная версия)"
        loading="lazy"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-teal-900/80"
        style={{ zIndex: 2 }}
      ></div>
      <div className="relative z-10 px-4 flex flex-col justify-center h-full py-12 max-w-3xl mx-auto">
        <div className="flex-1 flex items-center justify-center px-8 sm:px-4">
          {showButtons && (
            <div className="space-y-8 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
                <button
                  onClick={() => openSlider('where')}
                  className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                  style={{ animationDelay: '0.6s' }}
                  aria-label="Открыть информацию об адресе"
                >
                  Адрес
                </button>
                <button
                  onClick={() => openSlider('about')}
                  className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                  style={{ animationDelay: '0.7s' }}
                  aria-label="Открыть информацию о помещении"
                >
                  Помещение
                </button>
                <button
                  onClick={() => openSlider('value')}
                  className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                  style={{ animationDelay: '0.8s' }}
                  aria-label="Открыть информацию о ценности"
                >
                  Ценность
                </button>
                <button
                  onClick={scrollToGallery}
                  className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                  style={{ animationDelay: '0.9s' }}
                  aria-label="Перейти к галерее"
                >
                  Галерея
                </button>
              </div>
              <button
                onClick={() => openSlider('price')}
                className="w-full border-2 border-yellow-500 text-yellow-100 bg-yellow-600/30 py-3 px-6 sm:py-5 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-yellow-600/50 transition-transform hover:scale-105"
                style={{ animationDelay: '0.7s' }}
                aria-label="Открыть информацию о цене и обосновании"
              >
                Цена. Обоснование
              </button>
            </div>
          )}
        </div>
        <div className="text-center mb-12">
          <div className="relative inline-block group">
            <button
              onClick={openVideoModal}
              className="text-teal-100 text-5xl hover:text-teal-300 transition-transform hover:scale-110 animate-fadeInUp drop-shadow-md mb-4"
              style={{ animationDelay: '1.5s' }}
              aria-label="Открыть видео о помещении"
            >
              <FaPlayCircle />
            </button>
            <div className="absolute bottom-full mb-2 hidden group-hover:block group-focus:block bg-teal-600/50 text-teal-100 text-sm rounded py-1 px-2 w-max">
              Смотреть видео тура по помещению
            </div>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white my-4 animate-fadeInUp drop-shadow-lg"
            style={{ animationDelay: '2s' }}
          >
            Премиум Класс Недвижимость
          </h2>
          <p
            className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 animate-fadeInUp drop-shadow-md"
            style={{ animationDelay: '4s' }}
          >
            Помещение с отдельным входом для салона красоты, услуг, офиса, врачебной практики в элитном районе центра Минска возле Национальной Библиотеки - Маяк Минска
          </p>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-4 w-full sm:w-3/4 max-w-4xl relative">
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full"
              aria-label="Закрыть видео"
            >
              ×
            </button>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Видео тура по помещению</h3>
            {videoError ? (
              <p className="text-red-600 text-center">{videoError}</p>
            ) : (
              <AdvancedVideo
                cldVid={cld.video('bmovy3i3i43kts5wa11u').quality('auto').format('mp4')}
                poster={cld.image('fdnaj1skiohqpipsibbz').quality('auto').toURL()}
                controls
                className="w-full h-auto sm:h-96 rounded"
                autoPlay
                onError={handleVideoError}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;