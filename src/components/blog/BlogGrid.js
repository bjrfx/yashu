import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectOption } from '../ui/select';

const BlogGrid = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get unique categories from posts
  const categories = ['All', ...new Set(posts.flatMap(post => post.categories || []))];
  
  // Filter posts when search term or category changes
  useEffect(() => {
    let results = [...posts];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      results = results.filter(post => 
        post.categories && post.categories.includes(selectedCategory)
      );
    }
    
    setFilteredPosts(results);
  }, [searchTerm, selectedCategory, posts]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Filter and search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="Filter by category"
        >
          <SelectOption value="">All Categories</SelectOption>
          {categories.map(category => (
            <SelectOption key={category} value={category}>
              {category}
            </SelectOption>
          ))}
        </Select>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
      </div>
      
      {/* Blog posts grid */}
      {filteredPosts.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
          {(searchTerm || selectedCategory) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
