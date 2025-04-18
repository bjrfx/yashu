import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = ({ images, columns = 3, gap = 4, lightbox = true }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Calculate gap class based on prop
  const gapClass = `gap-${gap}`;

  // Define column class based on prop
  const getColumnClass = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Animation variants for grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Open lightbox
  const openLightbox = (image) => {
    if (lightbox) {
      setSelectedImage(image);
      document.body.style.overflow = 'hidden';
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className={`grid ${getColumnClass()} ${gapClass}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="overflow-hidden rounded-md cursor-pointer"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            onClick={() => openLightbox(image)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative aspect-w-3 aspect-h-4 overflow-hidden rounded-md">
              <img
                src={image.url}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <motion.div 
              className="relative max-w-4xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt || 'Enlarged view'}
                className="rounded-lg max-h-[90vh] max-w-full object-contain"
              />
              
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                  <p className="text-white text-sm md:text-base">{selectedImage.caption}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
