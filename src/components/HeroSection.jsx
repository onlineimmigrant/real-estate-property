import React from 'react';
import HeroImage from '../real_estate_hero.svg';
import HeroImageMobile from '../real_estate_hero_mobile.svg';

function HeroSection({ showHero, showButtons, openSlider, scrollToGallery }) {
  if (!showHero) return null;

  return (
    <section className="h-screen flex items-center justify-center text-center bg-gray-900 relative overflow-hidden">
      <img
        src={HeroImage}
        className="absolute w-3/4 h-3/4 mx-auto my-auto object-contain opacity-70 animate-moveHorizontal hidden sm:block"
        alt="Property hero image"
        loading="lazy"
        style={{ zIndex: 1 }}
      />
      <img
        src={HeroImageMobile}
        className="absolute w-3/4 h-3/4 mx-auto my-auto object-contain opacity-70 animate-moveHorizontal sm:hidden"
        alt="Property hero image mobile"
        loading="lazy"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-teal-900/80"
        style={{ zIndex: 2 }}
      ></div>
      <div className="relative z-10 px-4 flex flex-col justify-between h-full py-12 max-w-3xl mx-auto">
        <div className="flex-1 flex items-center justify-center">
          {showButtons && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
              <button
                onClick={() => openSlider('where')}
                className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                style={{ animationDelay: '0.6s' }}
              >
                Адрес
              </button>
              <button
                onClick={() => openSlider('about')}
                className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                style={{ animationDelay: '0.7s' }}
              >
                Помещение
              </button>
              <button
                onClick={() => openSlider('value')}
                className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                style={{ animationDelay: '0.8s' }}
              >
                Ценность
              </button>
              <button
                onClick={scrollToGallery}
                className="border-2 border-teal-500 text-teal-100 bg-teal-600/30 py-3 px-6 sm:py-5 sm:px-8 rounded-xl text-lg sm:text-2xl font-semibold hover:bg-teal-600/50 transition-transform hover:scale-105"
                style={{ animationDelay: '0.9s' }}
              >
                Галерея
              </button>
            </div>
          )}
        </div>
        <div className="text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp drop-shadow-lg"
            style={{ animationDelay: '2s' }}
          >
            Премиум Бизнес Недвижимость
          </h2>
          <p
            className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 animate-fadeInUp drop-shadow-md"
            style={{ animationDelay: '4s' }}
          >
            Продается уникальное помещение от собственника
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;