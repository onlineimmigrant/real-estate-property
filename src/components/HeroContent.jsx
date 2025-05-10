import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

function HeroContent({ showButtons, openSlider, scrollToGallery, openVideoModal }) {
  return (
    <div className="relative z-10 px-4 flex flex-col justify-center h-full py-12 max-w-3xl mx-auto">
      <div className="flex-1 flex items-center justify-center px-8 sm:px-4">
        {showButtons && (
          <div className="space-y-8 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto">

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
              <button
                onClick={() => openSlider('where')}
                className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                style={{ animationDelay: '0.6s' }}
                aria-label="Открыть информацию об адресе"
              >
                Адрес
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
      <div className="text-center mb-16">
        <div className="mt-8 relative inline-block group">
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
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp drop-shadow-lg"
          style={{ animationDelay: '2s' }}
        >
          Премиум Класс Недвижимость
        </h2>
        <p
          className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 animate-fadeInUp drop-shadow-md"
          style={{ animationDelay: '4s' }}
        >
            Под салон красоты, услуги, офис, врачебную практику, район Национальной Библиотеки, Маяка Минска 
          
        </p>
      </div>
    </div>
  );
}

export default HeroContent;