import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Hero from '../components/shared/Hero';
import VideoPlayer from '../components/shared/VideoPlayer';
import SEO from '../components/shared/SEO';
import { profile } from '../data/profile';

const Showreel = () => {
  // Main showreel video
  const mainShowreel = {
    title: "2023 Acting Showreel",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual showreel
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
    description: "A compilation of my best work across film, television, and commercials from the past two years."
  };
  
  // Additional performance clips
  const performanceClips = [
    {
      id: 1,
      title: "Dramatic Scene - 'The Last Letter'",
      url: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      description: "A powerful scene where my character confronts her past.",
      year: "2022",
      director: "Jane Anderson"
    },
    {
      id: 2,
      title: "Comedy Clip - 'Perfect Timing'",
      url: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      poster: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80",
      description: "A light-hearted scene showcasing comedic timing and delivery.",
      year: "2021",
      director: "Michael Stevens"
    },
    {
      id: 3,
      title: "Character Development - 'Transformation'",
      url: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      poster: "https://images.unsplash.com/photo-1576023867099-88c93cd5d57a?auto=format&fit=crop&q=80",
      description: "A montage showing the character's evolution throughout the film.",
      year: "2023",
      director: "Sarah Johnson"
    }
  ];
  
  // Interviews and behind-the-scenes
  const behindTheScenes = [
    {
      id: 1,
      title: "Interview - 'The Creative Process'",
      url: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      poster: "https://images.unsplash.com/photo-1521138054413-5a47d349b7af?auto=format&fit=crop&q=80",
      description: "A discussion about my approach to developing characters and preparing for roles."
    },
    {
      id: 2,
      title: "Behind the Scenes - 'City Lights'",
      url: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80",
      description: "A look at the making of the award-winning indie film."
    }
  ];
  
  // Animation variants
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
  
  return (
    <div>
      <SEO 
        title="Acting Showreel | Professional Actress Portfolio"
        description="Watch my acting showreel featuring clips from film, television, and theater performances."
      />
      
      <Hero
        title="Showreel"
        subtitle="A collection of my best performances on screen"
        backgroundImage="https://images.unsplash.com/photo-1524940753135-f993094eea7d?auto=format&fit=crop&q=80"
        height="medium"
      />
      
      {/* Main Showreel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4 text-center">Main Showreel</h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              {mainShowreel.description}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <VideoPlayer 
                videoUrl={mainShowreel.url}
                title={mainShowreel.title}
                posterImage={mainShowreel.poster}
                controls={true}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Performance Clips */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">Selected Performance Clips</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            A curated selection of scenes that showcase range, versatility, and character development.
          </p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {performanceClips.map((clip) => (
              <motion.div key={clip.id} variants={itemVariants}>
                <Card className="h-full flex flex-col">
                  <VideoPlayer 
                    videoUrl={clip.url}
                    posterImage={clip.poster}
                    controls={true}
                  />
                  <CardContent className="flex-grow p-6">
                    <h3 className="text-xl font-medium mb-2">{clip.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <span>{clip.year}</span>
                      <span className="mx-2">•</span>
                      <span>Dir. {clip.director}</span>
                    </div>
                    <p className="text-muted-foreground">{clip.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Interviews & BTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">Interviews & Behind the Scenes</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Insights into my acting process, experiences on set, and creative collaborations.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {behindTheScenes.map((video) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full flex flex-col">
                  <VideoPlayer 
                    videoUrl={video.url}
                    posterImage={video.poster}
                    controls={true}
                  />
                  <CardContent className="flex-grow p-6">
                    <h3 className="text-xl font-medium mb-2">{video.title}</h3>
                    <p className="text-muted-foreground">{video.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Filmography Summary */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">Filmography Highlights</h2>
            
            <div className="space-y-6">
              {profile.filmography.slice(0, 6).map((film, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-card rounded-lg border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div>
                    <h3 className="text-lg font-medium">{film.title}</h3>
                    <p className="text-muted-foreground italic">{film.role}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-sm text-right sm:text-left">
                    <p>Dir. {film.director}</p>
                    <p>{film.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/about">View Full Filmography</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section 
        className="py-24 bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Interested in Collaboration?</h2>
            <p className="text-lg text-white/90 mb-8">
              If you're looking for talent for your next project, I'd love to hear about the opportunity.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90 hover:text-black" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Showreel;
