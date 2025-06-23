import React from 'react';
import HeroImage from '../real_estate_hero.svg';

function Header({ showNavbar, resetToStart, scrollToGallery }) {
  return (
    <header
      className={`bg-gray-800/90 backdrop-blur-md text-white py-4 transition-opacity duration-500 ${
        showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ position: 'sticky', top: 0, zIndex: 20 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#start" onClick={resetToStart}>
          <Image
            src={HeroImage}
            className="w-14 h-14 object-contain"
            alt="Logo"
            loading="lazy"
          />
        </a>
        <nav className="flex space-x-6">
          <a
            href="#start"
            onClick={resetToStart}
            className="text-teal-100 hover:text-teal-300 transition-colors"
          >
            Старт
          </a>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToGallery();
            }}
            className="text-teal-100 hover:text-teal-300 transition-colors"
          >
            Медиа
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;