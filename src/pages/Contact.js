import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '../components/ui/separator';
import Hero from '../components/shared/Hero';
import ContactForm from '../components/shared/ContactForm';
import SocialLinks from '../components/shared/SocialLinks';
import SEO from '../components/shared/SEO';
import { ToastProvider } from '../components/ui/toast';
import { profile } from '../data/profile';

const Contact = () => {
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
    <ToastProvider>
      <SEO 
        title="Contact | Professional Actress Portfolio"
        description="Get in touch for acting opportunities, collaborations, press inquiries, or fan mail."
      />
      
      <Hero
        title="Get in Touch"
        subtitle="I'd love to hear from you"
        backgroundImage="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80"
        height="medium"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="lg:col-span-1 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-serif font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  Get in touch for acting opportunities, collaborations, press inquiries, or just to say hello.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <div>
                      <h3 className="text-base font-medium">Email</h3>
                      <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    </svg>
                    <div>
                      <h3 className="text-base font-medium">Agency Contact</h3>
                      <p className="text-muted-foreground">
                        <span className="block">{profile.agent.name}</span>
                        <span className="block">{profile.agent.agency}</span>
                        <a href={`mailto:${profile.agent.email}`} className="text-primary hover:underline block">
                          {profile.agent.email}
                        </a>
                        <a href={`tel:${profile.agent.phone}`} className="block">
                          {profile.agent.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                      <path d="M18 11.5a1.5 1.5 0 1 0 0 -3a1.5 1.5 0 0 0 0 3z"></path>
                      <path d="M13.5 6.5a1.5 1.5 0 1 0 0 -3a1.5 1.5 0 0 0 0 3z"></path>
                      <path d="M8.5 11.5a1.5 1.5 0 1 0 0 -3a1.5 1.5 0 0 0 0 3z"></path>
                      <path d="M6.5 16.5a1.5 1.5 0 1 0 0 -3a1.5 1.5 0 0 0 0 3z"></path>
                      <path d="M14.5 18.5a1.5 1.5 0 1 0 0 -3a1.5 1.5 0 0 0 0 3z"></path>
                      <path d="M16 9l-4.5 2.5"></path>
                      <path d="M12.5 8l-3.5 1.5"></path>
                      <path d="M10 14l2.5 2.5"></path>
                      <path d="M7.5 13l1.5 1.5"></path>
                    </svg>
                    <div>
                      <h3 className="text-base font-medium">Social Media</h3>
                      <p className="text-muted-foreground mb-2">
                        Connect with me on social platforms:
                      </p>
                      <SocialLinks color="default" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <Separator className="my-8" />
              
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-serif font-bold mb-4">FAQ</h3>
                <div className="space-y-4">
                  {profile.faq.map((item, index) => (
                    <div key={index}>
                      <h4 className="text-base font-medium">{item.question}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card border rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Based in Los Angeles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            While I'm based in Los Angeles, I'm available for projects worldwide.
          </p>
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
            <iframe 
              title="Location Map"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2740658098!2d-118.69192119136027!3d34.02016130628071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1655668358217!5m2!1sen!2suk" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </ToastProvider>
  );
};

export default Contact;
