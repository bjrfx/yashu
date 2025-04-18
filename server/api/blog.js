const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// In-memory blog data - in a real app this would be stored in a database
let blogPosts = [];

// Initialize blog data from the client-side data file
try {
  // Path to the client-side blog data file
  const blogDataPath = path.join(__dirname, '../../src/data/blog.js');
  
  // Read the file content and extract the blog posts array
  if (fs.existsSync(blogDataPath)) {
    const fileContent = fs.readFileSync(blogDataPath, 'utf8');
    
    // Use regex to extract the array from the file
    // This is a hacky way to import ES module in CommonJS, in production would use proper database
    const arrayMatch = fileContent.match(/export const blogPosts = (\[[\s\S]*?\]);/);
    
    if (arrayMatch && arrayMatch[1]) {
      // Convert the string representation of the array to an actual array
      // This is unsafe in production but works for our demo
      const arrayString = arrayMatch[1].replace(/export const /g, 'const ');
      blogPosts = eval(arrayString); // Never use eval in production
      
      console.log(`Loaded ${blogPosts.length} blog posts from data file`);
    }
  }
} catch (error) {
  console.error('Error loading blog data:', error);
}

// Get all blog posts with optional filtering
router.get('/', (req, res) => {
  try {
    const { category, tag, search, limit } = req.query;
    
    let filteredPosts = [...blogPosts];
    
    // Filter by category if provided
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories && post.categories.some(cat => 
          cat.toLowerCase() === category.toLowerCase()
        )
      );
    }
    
    // Filter by tag if provided
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags && post.tags.some(t => 
          t.toLowerCase() === tag.toLowerCase()
        )
      );
    }
    
    // Filter by search term if provided
    if (search) {
      const searchLowerCase = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLowerCase) ||
        post.excerpt.toLowerCase().includes(searchLowerCase) ||
        post.content.toLowerCase().includes(searchLowerCase)
      );
    }
    
    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      filteredPosts = filteredPosts.slice(0, parseInt(limit));
    }
    
    // Return only necessary data for list view (exclude full content)
    const postsForList = filteredPosts.map(({ id, title, slug, excerpt, date, categories, tags, coverImage, author }) => ({
      id, title, slug, excerpt, date, categories, tags, coverImage, author: { name: author.name, role: author.role }
    }));
    
    res.json(postsForList);
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve blog posts',
        status: 500
      }
    });
  }
});

// Get a single blog post by slug
router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    
    // Find the post with the matching slug
    const post = blogPosts.find(post => post.slug === slug);
    
    if (!post) {
      return res.status(404).json({
        error: {
          message: 'Blog post not found',
          status: 404
        }
      });
    }
    
    // Find index of current post
    const currentIndex = blogPosts.findIndex(p => p.slug === slug);
    
    // Get previous and next posts (for navigation)
    const previousPost = currentIndex > 0 ? 
      { id: blogPosts[currentIndex - 1].id, title: blogPosts[currentIndex - 1].title, slug: blogPosts[currentIndex - 1].slug } : 
      null;
      
    const nextPost = currentIndex < blogPosts.length - 1 ? 
      { id: blogPosts[currentIndex + 1].id, title: blogPosts[currentIndex + 1].title, slug: blogPosts[currentIndex + 1].slug } : 
      null;
    
    // Find related posts (sharing categories or tags)
    let relatedPosts = [];
    
    if (post.categories && post.categories.length > 0) {
      // Get posts with the same categories
      const postsWithSameCategory = blogPosts.filter(p => 
        p.id !== post.id && 
        p.categories.some(category => post.categories.includes(category))
      );
      
      relatedPosts = [...postsWithSameCategory];
    }
    
    if (relatedPosts.length < 3 && post.tags && post.tags.length > 0) {
      // Get posts with the same tags
      const postsWithSameTag = blogPosts.filter(p => 
        p.id !== post.id && 
        !relatedPosts.some(rp => rp.id === p.id) &&
        p.tags.some(tag => post.tags.includes(tag))
      );
      
      relatedPosts = [...relatedPosts, ...postsWithSameTag];
    }
    
    // Limit to 3 related posts and simplify the objects
    relatedPosts = relatedPosts.slice(0, 3).map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      date: p.date
    }));
    
    // Return post with navigation and related posts
    res.json({
      ...post,
      previousPost,
      nextPost,
      relatedPosts
    });
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve blog post',
        status: 500
      }
    });
  }
});

// Get all categories
router.get('/categories/all', (req, res) => {
  try {
    // Extract all unique categories
    const allCategories = blogPosts.reduce((categories, post) => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach(category => {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        });
      }
      return categories;
    }, []);
    
    // Sort alphabetically
    allCategories.sort();
    
    res.json(allCategories);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve categories',
        status: 500
      }
    });
  }
});

// Get all tags
router.get('/tags/all', (req, res) => {
  try {
    // Extract all unique tags
    const allTags = blogPosts.reduce((tags, post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
      return tags;
    }, []);
    
    // Sort alphabetically
    allTags.sort();
    
    res.json(allTags);
    
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve tags',
        status: 500
      }
    });
  }
});

module.exports = router;
