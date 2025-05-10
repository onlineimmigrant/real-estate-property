import React, { useState } from 'react';
import TextSlider from './TextSlider';
import Map from './Map';
import BlackPlanImage from '../black_plan.svg';
import PriceJustification from './PriceJustification';
import PriceDeclaration from './PriceDeclaration';

function Card({ type, closeSlider, whereLines, aboutLines, valueLines }) {
  const [activeTab, setActiveTab] = useState('declaration'); // Track active tab for 'price' case

  let title, content;
  switch (type) {


    case 'about':
      title = 'О помещении';
      content = (
        <>
          <img
            src={BlackPlanImage}
            className="py-8 w-3/4 mx-auto"
            alt="Property plan"
            loading="lazy"
          />
          <TextSlider lines={aboutLines} />
        </>
      );
      break;

    case 'value':
      title = 'Ценность';
      content = (
        <div className="py-16 text-2xl">
          <TextSlider lines={valueLines} />
        </div>
      );
      break;

    case 'where':
        title = 'Адрес';
        content = (
          <>
           <Map />
            <TextSlider lines={whereLines} />
           
          </>
        );
        break;
  
    case 'price':
            title = 'Цена';
            content = (
              <>
                <div role="tablist" className="flex justify-start mb-4 border-b border-gray-200">
                  <button
                    role="tab"
                    onClick={() => setActiveTab('declaration')}
                    className={`px-4 py-2 text-sm font-medium text-gray-600 ${
                      activeTab === 'declaration'
                        ? 'border-b-2 border-teal-600 text-teal-600 font-semibold'
                        : 'hover:text-teal-600'
                    } transition-colors`}
                    aria-selected={activeTab === 'declaration'}
                    aria-label="View price declaration"
                  >
                    Цена
                  </button>
                  <button
                    role="tab"
                    onClick={() => setActiveTab('justification')}
                    className={`px-4 py-2 text-sm font-medium text-gray-600 ${
                      activeTab === 'justification'
                        ? 'border-b-2 border-teal-600 text-teal-600 font-semibold'
                        : 'hover:text-teal-600'
                    } transition-colors`}
                    aria-selected={activeTab === 'justification'}
                    aria-label="View price justification"
                  >
                    Обоснование
                  </button>
      
                  <button
                    role="tab"
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 text-sm font-medium text-gray-600 ${
                      activeTab === 'history'
                        ? 'border-b-2 border-teal-600 text-teal-600 font-semibold'
                        : 'hover:text-teal-600'
                    } transition-colors`}
                    aria-selected={activeTab === 'history'}
                    aria-label="View price object history"
                  >
                    История
                  </button>
      
      
                  <button
                    role="tab"
                    onClick={() => setActiveTab('map')}
                    className={`px-4 py-2 text-sm font-medium text-gray-600 ${
                      activeTab === 'map'
                        ? 'border-b-2 border-teal-600 text-teal-600 font-semibold'
                        : 'hover:text-teal-600'
                    } transition-colors`}
                    aria-selected={activeTab === 'map'}
                    aria-label="View map"
                  >
                      
                    Карта
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {activeTab === 'declaration' && <PriceDeclaration />}
                  {activeTab === 'justification' && <PriceJustification />}
                  {activeTab === 'map' && <Map />}
                </div>
              </>
            );
            break;
      

    default:
      return null;
  }

  return (
    <div className="-mx-4  fixed inset-0 bg-transparent flex items-center justify-center z-30">
      <div className="bg-white p-6 px-10 sm:p-8 sm:rounded-xl h-full sm:h-4/5 w-full sm:max-w-3xl mx-4 shadow-2xl animate-spinAround relative flex flex-col">
        <button
          onClick={closeSlider}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="bg-gray-50 p-2 px-4 mr-4 text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
}

export default Card;