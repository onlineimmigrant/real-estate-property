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
      id: 0,
      line: 'Площадь: 102 м2',
      object_type: 'general',
    },
    {
      id: 1,
      line: 'Количество комнат: 4, санузел, мини-кухня',
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
      line: 'Санузел',
      object_type: 'kitchen',
    },
    {
      id: 7,
      line: 'Мини-кухня',
      object_type: 'kitchen',
    },

    {
      id: 8,
      line: 'Входная группа. Лифт для маломобильных групп населения',
      object_type: 'entrance',
    },
  ];

  const valueLines = [
    {
      id: 1,
      line: 'Недвижимость с действующим бизнесом',
      object_type: 'room_2',
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
      object_type: 'room_3',
    },
    {
      id: 5,
      line: 'Прямая продажа от собственника, без комиссии',
      object_type: 'benefit',
    },
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://minsksalonspace.com';

  return (
    <div className="bg-gray-50 font-sans">
  <Helmet>
        <title>Салонное помещение в Минске | МинскСалонСпейс</title>
        <meta
          name="description"
          content="Премиум салонное помещение 102 м² с отдельным входом в центре Минска, Маяк Минска. Идеально для салона красоты, офиса или практики. Цена: $2200/м²."
        />
        <meta
          name="keywords"
          content="салонное помещение Минск, Минск салон спейс, Петра Мстиславца 1, салон красоты, коммерческая недвижимость, Маяк Минска"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentUrl} />
        <meta
          property="og:title"
          content="Премиум салонное помещение 102 м² в Минске | МинскСалонСпейс"
        />
        <meta
          property="og:description"
          content="Элитное помещение для салона красоты, офиса или практики в центре Минска, Маяк Минска. Площадь 102 м², цена: $2200/м²."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:image"
          content="https://minsksalonspace.com/images/property_sale.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Салонное помещение 102 м² в Минске | МинскСалонСпейс"
        />
        <meta
          name="twitter:description"
          content="Элитное помещение для салона красоты в центре Минска, Маяк Минска. Площадь 102 м², цена: $2200/м²."
        />
        <meta
          name="twitter:image"
          content="https://minsksalonspace.com/images/property_sale.webp"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: 'Салонное помещение 102 м², Петра Мстиславца 1, Минск',
            description:
              'Элитное помещение для салона красоты, офиса или практики в центре Минска, Маяк Минска. Площадь 102 м², цена: $2200/м².',
            url: currentUrl, // Added required url field
            datePosted: '2025-05-10', // Added required datePosted field
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Петра Мстиславца 1-121',
              addressLocality: 'Минск',
              addressRegion: 'Минская область', // Added for clarity
              postalCode: '220114',
              addressCountry: 'BY',
            },
            floorSize: {
              '@type': 'QuantitativeValue',
              value: 102,
              unitCode: 'SQM', // Updated to correct unitCode (SQM for square meters)
              unitText: 'square meters', // Added for clarity
            },
            offers: {
              '@type': 'Offer',
              price: 224400,
              priceCurrency: 'USD',
              availability: 'InStock', // Simplified to a string value
              url: currentUrl, // Added url to the offer
              seller: {
                '@type': 'Person',
                name: 'Прямая продажа от собственника',
                description: 'Собственник недвижимости', // Added for clarity
              },
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Offer',
            name: 'Салонное помещение 102 м², Петра Мстиславца 1, Минск',
            description:
              'Элитное помещение для салона красоты, офиса или практики в центре Минска, Маяк Минска. Площадь 102 м², цена: $2200/м².',
            url: currentUrl,
            businessFunction: 'http://purl.org/goodrelations/v1#Sell', // Indicates this is a sale offer
            price: 224400,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Person',
              name: 'Прямая продажа от собственника',
              description: 'Собственник недвижимости',
            },
            itemOffered: {
              '@type': 'Place', // Using Place to represent the property
              name: 'Салонное помещение на Петра Мстиславца 1',
              description:
                'Элитное коммерческое помещение в центре Минска, Маяк Минска, идеально подходящее для салона красоты.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Петра Мстиславца 1-121',
                addressLocality: 'Минск',
                addressRegion: 'Минская область',
                postalCode: '220114',
                addressCountry: 'BY',
              },
              floorArea: { // Changed from floorSize to floorArea
                '@type': 'QuantitativeValue',
                value: 102,
                unitCode: 'SQM',
                unitText: 'square meters',
              },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: 'Тур по салонному помещению на Петра Мстиславца 1, Минск',
            description:
              'Видео элитного салонного помещения 102 м² с отдельным входом в Минске, Маяк Минска.',
            thumbnailUrl:
              'https://minsksalonspace.com/images/property_thumbnail.webp',
            contentUrl:
              'https://codedharmony.blob.core.windows.net/mstislavca/video_overview_main.mp4',
            embedUrl:
              'https://codedharmony.blob.core.windows.net/mstislavca/video_overview_main.mp4', // Added embedUrl
            uploadDate: '2025-05-10T08:00:00Z', // Updated to full ISO 8601 format
            duration: 'PT2M30S', // Added duration (e.g., 2 minutes 30 seconds)
            publisher: {
              '@type': 'Organization',
              name: 'МинскСалонСпейс',
              url: 'https://minsksalonspace.com',
            }, // Added publisher
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList', // Changed to ItemList for a gallery
            name: 'Галерея салонного помещения на Петра Мстиславца 1',
            description: 'Изображения элитного салонного помещения в Минске.',
            url: `${currentUrl}#gallery`, // Added URL to the gallery section
            numberOfItems: images.length, // Added number of items
            itemListElement: images.map((image, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'ImageObject',
                contentUrl: cld.image(image.public_id).quality('auto').toURL(), // Changed to contentUrl
                name: `Изображение салонного помещения ${index + 1}`,
                description: `Интерьер салонного помещения на Петра Мстиславца 1, Минск, изображение ${index + 1}`,
              },
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