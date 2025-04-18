import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

const BlogCard = ({ post, index }) => {
  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate reading time (approx. 200 words per minute)
  const calculateReadingTime = (content) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden">
          {post.coverImage && (
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
              />
            </div>
          )}
          
          <CardHeader className="pt-4 px-4 pb-2">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {post.categories.map((category) => (
                  <span 
                    key={category}
                    className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-muted-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            <CardTitle className="text-xl">{post.title}</CardTitle>
            
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>{calculateReadingTime(post.content)}</span>
            </div>
          </CardHeader>
          
          <CardContent className="px-4 py-2 flex-grow">
            <CardDescription className="line-clamp-3">
              {post.excerpt}
            </CardDescription>
          </CardContent>
          
          <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm font-medium">Read more</span>
              <svg 
                className="ml-1 w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg"
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
                {post.tags.length > 2 && <span>+{post.tags.length - 2}</span>}
              </div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
