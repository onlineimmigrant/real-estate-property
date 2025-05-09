import React from 'react';
import Gallery from './components/Gallery';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-700 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium">Продажа помещения от собственника</h1>
          <nav className="mt-2">
            <a href="#gallery" className="mr-4 hover:underline">Видео, Фотографии</a>
            <a href="#details" className="hover:underline">Детали</a>
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
          <p>© 2025 Property Sale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;