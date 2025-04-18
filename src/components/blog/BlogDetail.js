import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import SocialLinks from '../shared/SocialLinks';
import MarkdownRenderer from './MarkdownRenderer';
import { Separator } from '../ui/separator';

const BlogDetail = ({ post }) => {
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
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blog">Back to all posts</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="pb-12">
      {/* Hero section */}
      <div className="relative">
        {post.coverImage && (
          <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={`container mx-auto px-4 relative ${post.coverImage ? 'mt-[-80px] z-20' : 'mt-12'}`}>
          <motion.div 
            className={`bg-card p-6 md:p-10 rounded-lg shadow-lg ${!post.coverImage && 'border'}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
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

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">{post.title}</h1>
            
            {/* Meta information */}
            <div className="flex items-center text-sm text-muted-foreground mt-4 mb-6">
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>{calculateReadingTime(post.content)} read</span>
            </div>

            {/* Author info */}
            <div className="flex items-center py-4 border-y">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {post.author.name.charAt(0)}
                </div>
              </div>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main content */}
          <motion.div 
            className="md:col-span-8 lg:col-span-9"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3 space-y-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-medium mb-4">Share this post</h3>
              <SocialLinks color="muted" size="sm" />
            </div>

            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {post.relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="group">
                      <Link to={`/blog/${relatedPost.slug}`} className="block group">
                        <h4 className="text-base font-medium group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{formatDate(relatedPost.date)}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          {post.previousPost ? (
            <Button variant="outline" asChild>
              <Link to={`/blog/${post.previousPost.slug}`} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </Link>
            </Button>
          ) : (
            <div></div>
          )}

          <Button variant="outline" asChild>
            <Link to="/blog">
              All Posts
            </Link>
          </Button>

          {post.nextPost ? (
            <Button variant="outline" asChild>
              <Link to={`/blog/${post.nextPost.slug}`} className="flex items-center">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
