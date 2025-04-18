import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNavigation from './components/layout/MobileNavigation';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Showreel = lazy(() => import('./pages/Showreel'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Press = lazy(() => import('./pages/Press'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background text-foreground dark:text-foreground">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="flex items-center justify-center h-[70vh]">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/showreel" element={<Showreel />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/press" element={<Press />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}

export default App;
