import React from 'react';
import TextSlider from './TextSlider';
import Map from './Map';
import BlackPlanImage from '../black_plan.svg';

function Card({ type, closeSlider, whereLines, aboutLines, valueLines }) {
  let title, content;
  switch (type) {
    case 'where':
      title = 'Адрес';
      content = (
        <>
          <TextSlider lines={whereLines} />
          <Map />
        </>
      );
      break;
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
      content = <div  className="py-16 text-2xl "><TextSlider lines={valueLines} /></div>;
      break;
    default:
      return null;
  }

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-30">
      <div className="bg-white p-6 sm:p-8 sm:rounded-xl h-full sm:h-4/5 w-full sm:max-w-3xl mx-4 shadow-2xl animate-spinAround relative">
        <button
          onClick={closeSlider}
          className="absolute top-3 right-3  text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        {content}
      </div>
    </div>
  );
}

export default Card;