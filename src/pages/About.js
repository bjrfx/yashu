import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import Hero from '../components/shared/Hero';
import SocialLinks from '../components/shared/SocialLinks';
import SEO from '../components/shared/SEO';
import { profile } from '../data/profile';

const About = () => {
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
        title={`About ${profile.name} | Professional Actress`}
        description={profile.shortBio}
      />
      
      <Hero
        title="About Me"
        subtitle="My journey in the world of acting"
        backgroundImage="https://images.unsplash.com/photo-1533927857476-74b7dc92ec52?auto=format&fit=crop&q=80"
        height="large"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <aside>
              <motion.div 
                className="sticky top-24 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&q=80"
                  alt={profile.name}
                  className="rounded-lg w-full h-auto shadow-lg"
                />
                
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-serif font-semibold">Connect With Me</h3>
                  <SocialLinks color="muted" />
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-base font-medium mb-2">Representation</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="block font-medium">{profile.agent.name}</span>
                      <span className="block">{profile.agent.agency}</span>
                      <a href={`mailto:${profile.agent.email}`} className="text-primary hover:underline block mt-1">
                        {profile.agent.email}
                      </a>
                      <a href={`tel:${profile.agent.phone}`} className="block">
                        {profile.agent.phone}
                      </a>
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <Button asChild>
                    <Link to="/contact">Contact Me</Link>
                  </Button>
                </div>
              </motion.div>
            </aside>
            
            {/* Main content */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{profile.name}</h2>
                <p className="text-xl text-muted-foreground italic mb-6">
                  {profile.tagline}
                </p>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {profile.bio.map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </motion.div>
              
              <Separator />
              
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-serif font-bold mb-4">Skills & Specialties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Acting Styles</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {profile.skills.acting.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Performance Skills</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {profile.skills.performance.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <Separator />
              
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-serif font-bold mb-4">Education & Training</h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-medium">{edu.institution}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      <p className="text-sm">{edu.years}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <Separator />
              
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-serif font-bold mb-4">Select Filmography</h3>
                <div className="space-y-4">
                  {profile.filmography.slice(0, 5).map((film, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h4 className="text-lg font-medium">{film.title}</h4>
                        <p className="text-muted-foreground italic">{film.role}</p>
                      </div>
                      <div className="text-sm text-right mt-1 sm:mt-0">
                        <p>{film.director}</p>
                        <p>{film.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-center">
                  <Button variant="outline" asChild>
                    <a href="/files/actress-resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download Full Resume
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              <Separator />
              
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-serif font-bold mb-4">Awards & Recognition</h3>
                <div className="space-y-4">
                  {profile.awards.map((award, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-medium">{award.title}</h4>
                      <p className="text-muted-foreground">{award.organization}</p>
                      <p className="text-sm">{award.year}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Ready to work together?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            I'm always looking for exciting new projects and collaborations. Get in touch to discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Contact Me</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/showreel">View My Showreel</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
