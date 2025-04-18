import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '../ui/separator';
import SocialLinks from '../shared/SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto pt-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and about */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-serif font-bold">Actress Portfolio</h3>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional actress based in Los Angeles, specializing in film, television, and theater.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gallery
              </Link>
              <Link to="/showreel" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Showreel
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link to="/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Press
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="text-base font-medium">Contact</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Agency:</span> Premier Talent Agency
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Email:</span> contact@actressportfolio.com
              </p>
              <SocialLinks className="mt-4" />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Actress Portfolio. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
