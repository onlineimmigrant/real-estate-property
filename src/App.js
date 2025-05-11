import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Cloudinary } from '@cloudinary/url-gen';
import HeroSection from './components/HeroSection';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import propertyData from './components/property.json';

function App() {
  const [showHero, setShowHero] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [activeSlider, setActiveSlider] = useState(null);
  const [images, setImages] = useState([]);
  const cld = new Cloudinary({ cloud: { cloudName: 'dzagcqrbp' } });

  // Load images from property.json
  useEffect(() => {
    console.log('Property resources:', propertyData.resources);
    const imageResources = propertyData.resources.filter(
      (item) => item.resource_type === 'image'
    );
    setImages(imageResources);
  }, []);

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

  // JSON structure for lines with mixed object_type
  const whereLines = [
    {
      id: 1,
      line: 'Беларусь, Минск, Петра Мстиславца 1-121, 220114',
      object_type: 'location',
    },
    {
      id: 2,
      line: 'Район Национальной Библиотеки РБ (100м), Жилой комплекс "Маяк Минска"',
      object_type: 'location',
    },
  ];

  const aboutLines = [
    {
      id: 1,
      line: 'Площадь: 102 м2, Количество комнат: 4',
      object_type: 'general',
    },


    {
      id: 2,
      line: 'Комната 1',
      object_type: 'room_1', 
    },

    {
      id: 3,
      line: 'Комната 2',
      object_type: 'room_2', 
    },
    {
      id: 4,
      line: 'Комната 3',
      object_type: 'room_3', 
    },
    {
      id: 5,
      line: 'Комната 4',
      object_type: 'room_4', 
    },
    {
      id: 6,
      line: 'Санузел, мини-кухня',
      object_type: 'kitchen',
    },

    {
      id: 7,
      line: 'Входная группа. Лифт для маломобильных групп населения',
      object_type: 'entrance',
    },
  ];

  const valueLines = [
    {
      id: 1,
      line: 'Недвижимость с действующим бизнесом',
      object_type: 'benefit',
    },
    {
      id: 2,
      line: 'Современный дизайн и высококачественные материалы: износостойкая венецианская штукатурка, премиум плитка',
      object_type: 'benefit',
    },
    {
      id: 3,
      line: 'Многофункциональность: салон услуг (красоты, парикмахерская), торговля, офис',
      object_type: 'general', // Changed to 'general' for testing
    },
    {
      id: 4,
      line: 'Тепловая завеса, кондиционирование, вентиляция, водяной теплый пол, электроосвещение-класса люкс',
      object_type: 'benefit',
    },
    {
      id: 5,
      line: 'Прямая продажа от собственника, без комиссии',
      object_type: 'benefit',
    },
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com';

  return (
    <div className="bg-gray-50 font-sans">
      <Helmet>
        <title>Премиум недвижимость в Минске | Петра Мстиславца 1</title>
        <meta
          name="description"
          content="Премиум помещение 102 м² с отдельным входом для салона, офиса или практики в центре Минска, Маяк Минска. Цена: $2200/м²."
        />
        <meta
          name="keywords"
          content="премиум недвижимость Минск, Петра Мстиславца 1, салон красоты, офис, Маяк Минска, коммерческая недвижимость"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />
        <meta
          property="og:title"
          content="Премиум коммерческое помещение 102 м² в Минске"
        />
        <meta
          property="og:description"
          content="Помещение с отдельным входом для салона, офиса или врачебной практики в элитном районе Минска, Маяк Минска. Цена: $2200/м²."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:image"
          content={`${currentUrl}/images/property.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Премиум помещение 102 м² в Минске"
        />
        <meta
          name="twitter:description"
          content="Элитное помещение для бизнеса в центре Минска, Маяк Минска. Цена: $2200/м²."
        />
        <meta
          name="twitter:image"
          content={`${currentUrl}/images/property.jpg`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: 'Премиум коммерческое помещение 102 м², Петра Мстиславца 1, Минск',
            description:
              'Премиум помещение с отдельным входом для салона красоты, услуг, офиса или врачебной практики в элитном районе Минска, Маяк Минска. Цена: $2200/м².',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Петра Мстиславца 1-121',
              addressLocality: 'Минск, Беларусь',
              postalCode: '220114',
              addressCountry: 'BY',
            },
            floorSize: {
              '@type': 'QuantitativeValue',
              value: 102,
              unitCode: 'MTK',
            },
            offers: {
              '@type': 'Offer',
              price: 224400,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Person',
                name: 'Прямая продажа от собственника',
              },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: 'Тур по помещению на Петра Мстиславца 1, Минск',
            description:
              'Видео премиум коммерческого помещения 102 м² с отдельным входом в Минске, Маяк Минска.',
            thumbnailUrl:
              'https://res.cloudinary.com/dzagcqrbp/image/upload/fdnaj1skiohqpipsibbz.jpg',
            contentUrl:
              'https://res.cloudinary.com/dzagcqrbp/video/upload/bmovy3i3i43kts5wa11u.mp4',
            uploadDate: '2025-05-10',
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Галерея помещения на Петра Мстиславца 1',
            description: 'Изображения премиум коммерческого помещения в Минске.',
            itemListElement: images.map((image, index) => ({
              '@type': 'ImageObject',
              position: index + 1,
              url: cld.image(image.public_id).quality('auto').toURL(),
              name: `Изображение помещения ${index + 1}`,
              description: `Интерьер помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`,
            })),
          })}
        </script>
      </Helmet>

      <HeroSection
        showHero={showHero}
        showButtons={showButtons}
        openSlider={openSlider}
        scrollToGallery={scrollToGallery}
      />
      {activeSlider && (
        <div className="w-full">
          <Card
            type={activeSlider}
            closeSlider={closeSlider}
            whereLines={whereLines}
            aboutLines={aboutLines}
            valueLines={valueLines}
            resources={propertyData.resources}
          />
        </div>
      )}
      <Header
        showNavbar={showNavbar}
        resetToStart={resetToStart}
        scrollToGallery={scrollToGallery}
      />
      <main id="main-content">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;