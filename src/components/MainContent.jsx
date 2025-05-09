import React from 'react';
import Gallery from './Gallery';
import PropertyDetails from './PropertyDetails';

function MainContent() {
  return (
    <main className="container mx-auto px-6 py-12">
      <section id="gallery" className="mb-16">
        <Gallery />
      </section>
      <section id="details">
        <PropertyDetails />
      </section>
    </main>
  );
}

export default MainContent;