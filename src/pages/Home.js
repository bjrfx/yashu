import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import Hero from '../components/shared/Hero';
import SocialLinks from '../components/shared/SocialLinks';
import Gallery from '../components/shared/Gallery';
import VideoPlayer from '../components/shared/VideoPlayer';
import SEO from '../components/shared/SEO';
import { useFadeInUpAnimation } from '../utils/framerAnimations';
import { profile } from '../data/profile';
import { galleryImages } from '../data/gallery';
import { blogPosts } from '../data/blog';

const Home = () => {
  // Animation variants
  const { ref, controls, variants } = useFadeInUpAnimation();
  
  // Get latest blog posts for the homepage
  const latestPosts = blogPosts.slice(0, 3);
  
  // Show only a few images on the homepage
  const featuredGalleryImages = galleryImages.slice(0, 4);

  return (
    <div>
      <SEO 
        title="Actress Portfolio | Professional Acting Portfolio"
        description="Welcome to my professional acting portfolio. Explore my showreel, gallery, press mentions, and blog."
      />
      
      {/* Hero Section */}
      <Hero
        title={profile.name}
        subtitle={profile.tagline}
        backgroundImage="https://images.unsplash.com/photo-1536766768598-e09213fdcf22?auto=format&fit=crop&q=80"
        height="full"
        cta={
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/showreel">View Showreel</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black" asChild>
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        }
      >
        <SocialLinks color="white" size="lg" />
      </Hero>
      
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 border-2 border-primary opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&q=80"
                alt={profile.name}
                className="rounded-lg relative z-10 w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 border-2 border-primary opacity-30"></div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {profile.shortBio}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <Button asChild>
                  <Link to="/about">Read Full Biography</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured In Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">Featured In</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {profile.featuredIn.map((company, index) => (
              <motion.div 
                key={index}
                className="opacity-70 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl md:text-2xl font-serif">{company}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/press">View Press & Media</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Showreel Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Showreel</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse of my most recent and memorable performances on screen.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <VideoPlayer 
              title="Acting Showreel 2023"
              videoUrl="https://youtu.be/dQw4w9WgXcQ" 
              posterImage="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"
            />
            
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/showreel">View Full Showreel</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Preview Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore a selection of professional photographs from various productions and photoshoots.
            </p>
          </div>
          
          <Gallery images={featuredGalleryImages} columns={2} />
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Latest Blog Posts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights into my acting journey, behind-the-scenes stories, and thoughts on the craft.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  {post.coverImage && (
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/blog/${post.slug}`}>Read Post</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section 
        className="py-24 bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1560439513-74b037a25d84?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-white/90 mb-8">
              For acting opportunities, press inquiries, or just to say hello, I'd love to hear from you.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90 hover:text-black" asChild>
              <Link to="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
