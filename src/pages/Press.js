import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import Hero from '../components/shared/Hero';
import SEO from '../components/shared/SEO';
import { press } from '../data/press';

const Press = () => {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Sort press items by date (newest first)
  const sortedPressItems = [...press.items].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <SEO 
        title="Press & Media | Professional Actress Portfolio"
        description="Press coverage, interviews, reviews, and media mentions from my acting career."
      />
      
      <Hero
        title="Press & Media"
        subtitle="Reviews, interviews, and media coverage"
        backgroundImage="https://images.unsplash.com/photo-1560439513-74b037a25d84?auto=format&fit=crop&q=80"
        height="medium"
      />
      
      {/* Featured Press */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Featured Coverage</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {press.featured.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  {item.image && (
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.outlet} 
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {item.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <span>{item.outlet}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{item.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        Read Full Article
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Press Quotes */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Press Quotes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {press.quotes.map((quote, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card border rounded-lg p-6 shadow-sm"
              >
                <div className="flex-1">
                  <svg className="h-8 w-8 text-muted-foreground mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v136zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v136z"/>
                  </svg>
                  <p className="text-lg mb-6 font-serif italic">"{quote.text}"</p>
                  <div className="mt-auto">
                    <p className="font-medium">{quote.source}</p>
                    <p className="text-sm text-muted-foreground">{quote.publication}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Full Press List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-2 text-center">All Press Coverage</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A comprehensive list of interviews, reviews, features, and mentions from various media outlets.
          </p>
          
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedPressItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full mr-3">
                      {item.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mt-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.outlet}</p>
                </div>
                
                <Button variant="outline" size="sm" asChild>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Press Kit */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Press Kit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            For journalists, bloggers, and media professionals. Download official photos, bio, and press materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/files/press-kit.zip" download>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Press Kit
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                Press Inquiry
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Press;
