import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/shared/Hero';
import BlogGrid from '../components/blog/BlogGrid';
import SEO from '../components/shared/SEO';
import { blogPosts } from '../data/blog';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, just simulate loading
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Set posts from our data file
        setPosts(blogPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <SEO 
        title="Blog | Acting Insights & Behind-the-Scenes"
        description="Read articles about acting, behind-the-scenes stories, and insights into the entertainment industry."
      />
      
      <Hero
        title="Blog"
        subtitle="Thoughts, stories, and insights from my acting journey"
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"
        height="medium"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-destructive mb-4">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground mb-4">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BlogGrid posts={posts} />
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
