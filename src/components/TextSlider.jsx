import React, { useState, useEffect, useRef } from 'react';

function TextSlider({ lines }) {
  const [currentLine, setCurrentLine] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    console.log('TextSlider lines:', lines);
  }, [lines]);

  useEffect(() => {
    if (lines.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          const next = (prev + 1) % lines.length;
          console.log('Auto-cycle to:', next);
          return next;
        });
      }, 4000);
    }
    return () => {
      console.log('Clearing timer');
      clearInterval(timerRef.current);
    };
  }, [lines]);

  const goToPrev = () => {
    console.log('Prev clicked, current:', currentLine);
    clearInterval(timerRef.current);
    setCurrentLine((prev) => {
      const next = (prev - 1 + lines.length) % lines.length;
      console.log('Set to prev:', next);
      return next;
    });
    if (lines.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          const next = (prev + 1) % lines.length;
          console.log('Auto-cycle to:', next);
          return next;
        });
      }, 4000);
    }
  };

  const goToNext = () => {
    console.log('Next clicked, current:', currentLine);
    clearInterval(timerRef.current);
    setCurrentLine((prev) => {
      const next = (prev + 1) % lines.length;
      console.log('Set to next:', next);
      return next;
    });
    if (lines.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          const next = (prev + 1) % lines.length;
          console.log('Auto-cycle to:', next);
          return next;
        });
      }, 4000);
    }
  };

  const goToLine = (index) => {
    console.log('Dot clicked, index:', index);
    clearInterval(timerRef.current);
    setCurrentLine(index);
    if (lines.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          const next = (prev + 1) % lines.length;
          console.log('Auto-cycle to:', next);
          return next;
        });
      }, 4000);
    }
  };

  if (!lines || lines.length === 0) {
    return <p className="text-gray-600">No content available</p>;
  }

  return (
    <div className="relative">
      <div className="h-24 flex items-center">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 animate-fadeSlide ${
              index === currentLine ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-gray-600 leading-relaxed text-xl">{line}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8 space-x-4">
        <button
          onClick={goToPrev}
          className="slider-button text-xl bg-gray-400 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 hover:text-gray-800 transition-colors"
          aria-label="Previous text line"
        >
          ←
        </button>
        <button
          onClick={goToNext}
          className="slider-button text-xl bg-teal-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-teal-700 transition-colors"
          aria-label="Next text line"
        >
          →
        </button>
      </div>
      <div className="flex justify-center mt-2 space-x-2">
        {lines.map((_, index) => (
          <button
            key={index}
            onClick={() => goToLine(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentLine ? 'bg-teal-600' : 'bg-gray-400'
            }`}
            aria-label={`Go to text line ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default TextSlider;