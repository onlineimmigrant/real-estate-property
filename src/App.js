import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  const [showHero, setShowHero] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [activeSlider, setActiveSlider] = useState(null);

  useEffect(() => {
    if (showHero) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showHero]);

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

  const scrollToGallery = () => {
    setShowHero(false);
    setShowNavbar(true);
    setActiveSlider(null);
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  };

  const openSlider = (slider) => {
    setActiveSlider(slider);
  };

  const closeSlider = () => {
    setActiveSlider(null);
  };

  const resetToStart = (e) => {
    e.preventDefault();
    setShowHero(true);
    setShowNavbar(false);
    setShowButtons(false);
    setActiveSlider(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whereLines = ['Беларусь, Минск, Петра Мстиславца 1-121, 220114', 'Район Национальной Библиотеки РБ (100м), Жилой комплекс "Маяк Минска" '];
  const aboutLines = [
    'Количество комнат: 4',
    'Санузел, мини-кухня',
    'Площадь: 102 м2',
    'Лифт для маломобильных груп населения',
  ];
  const valueLines = [
    'Недвижимость с действующим бизнесом',
    'Современный дизайн и высококачественные материалы: износостойкая венецианская штукатурка, премим плитка',
    'Многофункциональсть: салон услуг (красоты, парикмахерская), торговля, офис', 
    "Тепловая завеса, кондиционирование, вентиляция, водяной теплый пол, электроосвещение-класса люкс",
    'Прямая продажа от собственника, без комиссии',
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <HeroSection
        showHero={showHero}
        showButtons={showButtons}
        openSlider={openSlider}
        scrollToGallery={scrollToGallery}
      />
      {activeSlider && (
        <Card
          type={activeSlider}
          closeSlider={closeSlider}
          whereLines={whereLines}
          aboutLines={aboutLines}
          valueLines={valueLines}
        />
      )}
      <Header
        showNavbar={showNavbar}
        resetToStart={resetToStart}
        scrollToGallery={scrollToGallery}
      />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;