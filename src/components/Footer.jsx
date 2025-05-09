import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4">© 2025 Sovtechexport</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-teal-100 hover:text-teal-300">
            Контакты
          </a>
          <a href="#" className="text-teal-100 hover:text-teal-300">
            О нас
          </a>
          <a href="#" className="text-teal-100 hover:text-teal-300">
            Политика
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;