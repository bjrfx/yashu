import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Toggle } from '../components/ui/toggle';
import Hero from '../components/shared/Hero';
import Gallery from '../components/shared/Gallery';
import SEO from '../components/shared/SEO';
import { galleryImages } from '../data/gallery';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [layoutType, setLayoutType] = useState('grid'); // 'grid' or 'masonry'
  
  // Get unique categories
  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  
  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <div>
      <SEO 
        title="Photo Gallery | Professional Actress Portfolio"
        description="Explore a collection of professional photographs from various productions, photoshoots, and behind-the-scenes moments."
      />
      
      <Hero
        title="Gallery"
        subtitle="A visual journey through my acting career"
        backgroundImage="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&q=80"
        height="medium"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter controls */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Toggle
                  key={category}
                  pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Toggle>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Toggle
                pressed={layoutType === 'grid'}
                onClick={() => setLayoutType('grid')}
                aria-label="Grid view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </Toggle>
              <Toggle
                pressed={layoutType === 'masonry'}
                onClick={() => setLayoutType('masonry')}
                aria-label="Masonry view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </Toggle>
            </div>
          </div>
          
          {/* Display count of filtered images */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
              {selectedCategory !== 'all' ? ` in category "${selectedCategory}"` : ''}
            </p>
          </div>
          
          {/* Gallery component */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory + layoutType} // Force re-render when filters change
          >
            {filteredImages.length > 0 ? (
              <Gallery 
                images={filteredImages} 
                columns={layoutType === 'grid' ? 3 : 2} 
                gap={6} 
                lightbox={true} 
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-6">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <h3 className="text-xl font-medium mb-2">No images found</h3>
                <p className="text-muted-foreground mb-6">There are no images in this category yet.</p>
                <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                  Reset filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Behind the scenes section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Behind the Scenes</h2>
            <p className="text-lg text-muted-foreground">
              Get a glimpse of the magic that happens when the cameras aren't rolling. These candid moments capture the essence of filmmaking from a different perspective.
            </p>
          </div>
          
          <Gallery 
            images={galleryImages.filter(img => img.category === 'behind-the-scenes')}
            columns={3}
            gap={6}
            lightbox={true}
          />
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Interested in a Photoshoot?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            If you're a photographer looking to collaborate or a production company in need of promotional images, I'd love to hear from you.
          </p>
          <Button size="lg" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
