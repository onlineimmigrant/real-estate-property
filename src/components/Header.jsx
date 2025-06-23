import React from 'react';
import HeroImage from '../real_estate_hero.svg';

function Header({ showNavbar, resetToStart, scrollToGallery }) {
  return (
    <header
      className={`bg-white shadow-md text-gray-800 py-4 transition ${
        showNavbar ? 'opacity-100' : 'none'
      }`}
      style={{ position: 'sticky', top: 0, zIndex: 20 }}
    >
      <div className="container mx-auto px-20 flex items-center">
        <a href="#start" onClick={resetToStart}>
          <img
            src={HeroImage}
            className="w-20 h-20 object-contain"
            alt="Logo"
            loading="lazy"
          />
        </a>
        <nav className="flex items-center justify-center space-x-20">
          <a
            href="#start"
            onClick={resetToStart}
            className="text-teal-600 hover:text-teal-800 transition-colors font-semibold"
          >
            Старт
          </a>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToGallery();
            }}
            className="text-teal-600 hover:text-teal-800 transition-colors font-semibold"
          >
            Медиа
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;