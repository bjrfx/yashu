import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogDetail from '../components/blog/BlogDetail';
import SEO from '../components/shared/SEO';
import { blogPosts } from '../data/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Find the post with the matching slug
        const foundPost = blogPosts.find(post => post.slug === slug);
        
        if (!foundPost) {
          // If no post is found, set error
          setError('Post not found');
          setLoading(false);
          return;
        }
        
        // Find previous and next posts for navigation
        const currentIndex = blogPosts.findIndex(post => post.slug === slug);
        const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
        const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
        
        // Find related posts based on same category or tags
        let relatedPosts = [];
        if (foundPost.categories && foundPost.categories.length > 0) {
          // Find posts with same category
          relatedPosts = blogPosts.filter(p => 
            p.id !== foundPost.id && 
            p.categories.some(category => foundPost.categories.includes(category))
          );
        }
        
        if (relatedPosts.length < 3 && foundPost.tags && foundPost.tags.length > 0) {
          // Add posts with same tags if we don't have enough related posts
          const tagRelated = blogPosts.filter(p => 
            p.id !== foundPost.id && 
            !relatedPosts.some(rp => rp.id === p.id) && // Don't add duplicates
            p.tags.some(tag => foundPost.tags.includes(tag))
          );
          
          relatedPosts = [...relatedPosts, ...tagRelated];
        }
        
        // Limit to 3 related posts
        relatedPosts = relatedPosts.slice(0, 3);
        
        // Set the post with navigation and related posts info
        setPost({
          ...foundPost,
          previousPost,
          nextPost,
          relatedPosts
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // If slug changes, refetch the post
  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [slug]);

  // Handle 404 case - redirect to blog
  useEffect(() => {
    if (error === 'Post not found') {
      const timeout = setTimeout(() => {
        navigate('/blog', { replace: true });
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);

  return (
    <div>
      {post && (
        <SEO 
          title={`${post.title} | Blog`}
          description={post.excerpt}
          imageUrl={post.coverImage}
          type="article"
          articlePublishedTime={post.date}
          articleTags={post.tags}
        />
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-destructive mb-6">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2 className="text-2xl font-bold mb-2">Post not found</h2>
          <p className="text-muted-foreground mb-4">
            {error === 'Post not found' 
              ? 'The blog post you\'re looking for doesn\'t exist or has been removed.' 
              : error}
          </p>
          <p className="text-sm text-muted-foreground">
            {error === 'Post not found' && 'Redirecting to blog page...'}
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BlogDetail post={post} />
        </motion.div>
      )}
    </div>
  );
};

export default BlogPost;
