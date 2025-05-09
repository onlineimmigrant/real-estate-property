import React, { useState, useEffect } from 'react';

function Map() {
  const [mapType, setMapType] = useState('map'); // 'map' or 'panorama'
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [hasPanorama, setHasPanorama] = useState(null); // Track panorama availability

  useEffect(() => {
    // Load Yandex Maps API script
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=d58a2626-3968-4712-942e-2ecd9be03c52&lang=en_US';
    script.async = true;
    script.onload = () => {
      console.log('Yandex Maps API loaded successfully');
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Yandex Maps API');
      setError('Failed to load map. Please check your API key or internet connection.');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && window.ymaps) {
      window.ymaps.ready(() => {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
          console.error('Map container not found');
          setError('Map container not found');
          return;
        }

        // Clear previous content
        mapContainer.innerHTML = '';

        // Check panorama availability on first load
        if (hasPanorama === null) {
          window.ymaps.panorama.locate([53.9354, 27.6577]).then(
            (panoramas) => {
              console.log('Panorama check: ', panoramas.length, 'found');
              setHasPanorama(panoramas.length > 0);
            },
            (err) => {
              console.error('Panorama availability check failed:', err);
              setHasPanorama(false);
            }
          );
        }

        if (mapType === 'map' || (mapType === 'panorama' && !hasPanorama)) {
          // Standard map (or fallback if no panorama)
          try {
            const map = new window.ymaps.Map('map', {
              center: [53.9354, 27.6577], // Minsk, Petra Mstislavca 1
              zoom: 15,
              controls: ['zoomControl', 'fullscreenControl'],
            });
            map.geoObjects.add(
              new window.ymaps.Placemark([53.9354, 27.6577], {
                balloonContent:
                  mapType === 'map'
                    ? 'Беларусь, Минск, Петра Мстиславца 1'
                    : 'Беларусь, Минск, Петра Мстиславца 1 (Street panorama not available)',
                hintContent: 'Property Location',
              })
            );
          } catch (err) {
            console.error('Map initialization error:', err);
            setError('Failed to initialize map');
          }
        } else if (mapType === 'panorama' && hasPanorama) {
          // Panorama
          window.ymaps.panorama.locate([53.9354, 27.6577]).then(
            (panoramas) => {
              if (panoramas.length) {
                try {
                  new window.ymaps.panorama.Player('map', panoramas[0], {
                    autoFit: true,
                    controls: ['panoramaControl', 'zoomControl'],
                    direction: [0, 10], // Default view direction
                  });
                } catch (err) {
                  console.error('Panorama player error:', err);
                  setError('Failed to load street panorama');
                  setMapType('map'); // Fallback to map
                }
              } else {
                console.warn('No panorama available at this location');
                setError('Street panorama not available for this location');
                setMapType('map'); // Fallback to map
              }
            },
            (err) => {
              console.error('Panorama locate error:', err);
              setError('Failed to load street panorama: ' + err.message);
              setMapType('map'); // Fallback to map
            }
          );
        }
      });
    }
  }, [isScriptLoaded, mapType, hasPanorama]);

  if (error) {
    return (
      <div className="w-full h-64 rounded-lg mt-6 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!isScriptLoaded) {
    return (
      <div className="w-full h-64 rounded-lg mt-6 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setMapType('map')}
          className={`px-4 py-2 rounded-full text-white ${
            mapType === 'map' ? 'bg-teal-600' : 'bg-gray-400'
          } hover:bg-teal-700 transition-colors`}
          aria-label="Switch to standard map"
        >
          Standard Map
        </button>
        <button
          onClick={() => setMapType('panorama')}
          className={`px-4 py-2 rounded-full text-white ${
            mapType === 'panorama' ? 'bg-teal-600' : 'bg-gray-400'
          } hover:bg-teal-700 transition-colors ${
            hasPanorama === false ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Switch to street panorama"
          disabled={hasPanorama === false}
        >
          Street Panorama
        </button>
      </div>
      <div
        id="map"
        className="w-full h-64 rounded-lg"
        aria-label="Map of Minsk, Petra Mstislavca 1"
      />
    </div>
  );
}

export default Map;