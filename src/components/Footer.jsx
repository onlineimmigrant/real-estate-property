import React, { useState } from 'react';
import ContactSection from './ContactSection'; // Import the new parent component

function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">© 2025 Sovtechexport</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={openContact}
              className="text-teal-100 hover:text-teal-300 focus:outline-none"
            >
              Контакты
            </button>
          </div>
        </div>
      </footer>

      {/* Render the ContactSection modal */}
      <ContactSection isOpen={isContactOpen} onClose={closeContact} />
    </>
  );
}

export default Footer;