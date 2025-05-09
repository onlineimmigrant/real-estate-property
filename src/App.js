import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import PropertyDetails from './components/PropertyDetails';
import HeroImage from './real_estate_hero.svg';
import HeroImageMobile from './real_estate_hero_mobile.svg';

function App() {
  // State for hero, navbar, buttons, and sliders
  const [showHero, setShowHero] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [activeSlider, setActiveSlider] = useState(null);

  // Show buttons after 2.5s
  useEffect(() => {
    if (showHero) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showHero]);

  // Show navbar when scrolling past initial viewport
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2 && showHero) {
        setShowHero(false);
        setShowNavbar(true);
        setActiveSlider(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showHero]);

  // Scroll to gallery and hide hero
  const scrollToGallery = () => {
    setShowHero(false);
    setShowNavbar(true);
    setActiveSlider(null);
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  };

  // Open slider
  const openSlider = (slider) => {
    setActiveSlider(slider);
  };

  // Close slider
  const closeSlider = () => {
    setActiveSlider(null);
  };

  // Reset to initial screen
  const resetToStart = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setShowHero(true);
    setShowNavbar(false);
    setShowButtons(false);
    setActiveSlider(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      {showHero && (
        <section className="h-screen flex items-center justify-center text-center bg-gray-900 relative">
          {/* Background Image */}
          <img
            src={HeroImage}
            className="absolute w-3/4 h-3/4 mx-auto my-auto object-contain opacity-70 animate-moveHorizontal hidden sm:block"
            alt="Property hero image"
            style={{ zIndex: 1 }}
          />
          <img
            src={HeroImageMobile}
            className="absolute w-3/4 h-3/4 mx-auto my-auto object-contain opacity-70 animate-moveHorizontal sm:hidden"
            alt="Property hero image mobile"
            style={{ zIndex: 1 }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"
            style={{ zIndex: 2 }}
          ></div>

          {/* Hero Content */}
          <div className="relative z-10 px-4 flex flex-col justify-between h-full py-8">
            <div className="flex-1 flex items-center justify-center">
              {showButtons && (
                <div className="grid grid-cols-2 gap-6 w-full h-1/2 mx-auto">
                  <button
                    onClick={() => openSlider('where')}
                    className="border-2 border-white text-white bg-white/20 py-2 px-4 rounded-lg text-xl sm:text-3xl font-semibold hover:bg-white/40 transition animate-bounceIn"
                    style={{ animationDelay: '0.6s' }}
                  >
                    Адрес
                  </button>
                  <button
                    onClick={() => openSlider('about')}
                    className="border-2 border-white text-white bg-white/20 py-2 px-4 rounded-lg text-xl sm:text-3xl font-semibold hover:bg-white/40 transition animate-bounceIn"
                    style={{ animationDelay: '0.7s' }}
                  >
                    Помещение
                  </button>
                  <button
                    onClick={() => openSlider('value')}
                    className="border-2 border-white text-white bg-white/20 py-2 px-4 rounded-lg text-xl sm:text-3xl font-semibold hover:bg-white/40 transition animate-bounceIn"
                       style={{ animationDelay: '0.8s' }}
                  >
                    Ценность
                  </button>
                  <button
                    onClick={scrollToGallery}
                    className="border-2 border-white text-white bg-white/20 py-2 px-4 rounded-lg text-xl sm:text-3xl font-semibold hover:bg-white/40 transition animate-bounceIn"
                    style={{ animationDelay: '0.9s' }}
                  >
                    Галерея
                  </button>
                </div>
              )}
            </div>
            <div className="text-center">
              <h2
                className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp animate-moveToTop"
                style={{ animationDelay: '2s' }}
              >
                Добро пожаловать
              </h2>
              <p
                className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeInUp animate-moveToTop"
                style={{ animationDelay: '4s' }}
              >
                Продается уникальное помещение от собственника
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sliders */}
      {activeSlider === 'where' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Адрес</h3>
            <p className="mb-4">123 Dream Home Lane, City, State, ZIP</p>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4">
              <p>Карта (требуется API, например, Google Maps)</p>
            </div>
            <button
              onClick={closeSlider}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      {activeSlider === 'about' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">О помещении</h3>
            <p className="mb-4">
              Количество комнат: 4<br />
              Ванные комнаты: 3<br />
              Площадь: 2500 кв. футов<br />
              Описание: Современное помещение с потрясающими видами, просторными жилыми зонами и большим задним двором.
            </p>
            <button
              onClick={closeSlider}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      {activeSlider === 'value' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Преимущества</h3>
            <p className="mb-4">
              - Уникальное расположение с живописными видами<br />
              - Современный дизайн и высококачественные материалы<br />
              - Просторные и светлые помещения<br />
              - Прямая продажа от собственника, без комиссии
            </p>
            <button
              onClick={closeSlider}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className={`bg-gray-700 text-white py-4 transition-opacity duration-500 ${
          showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ position: 'sticky', top: 0, zIndex: 20 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="#start" onClick={resetToStart}>
            <img
              src={HeroImage}
              className="w-12 h-12 object-contain"
              alt="Logo"
            />
          </a>
          <nav className="mt-2">
            <a
              href="#start"
              onClick={resetToStart}
              className="mr-4 hover:underline"
            >
              Старт
            </a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                scrollToGallery();
              }}
              className="mr-4 hover:underline"
            >
              Медиа
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section id="gallery" className="mb-12">
          <Gallery />
        </section>
        <section id="details">
          <PropertyDetails />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Sovtechexport</p>
        </div>
      </footer>
    </div>
  );
}

export default App;