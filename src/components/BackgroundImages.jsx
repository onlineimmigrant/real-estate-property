import React from 'react';
import HeroImage from '../real_estate_hero.svg';
import HeroImageMobile from '../real_estate_hero_mobile.svg';

function BackgroundImages() {
  return (
    <>
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
        alt="Премиум коммерческое помещение на Петра Мстиславца 1, Минск"
        loading="lazy"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-teal-900/80"
        style={{ zIndex: 2 }}
      ></div>
    </>
  );
}

export default BackgroundImages;