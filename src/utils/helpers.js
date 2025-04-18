/**
 * Format a date string to a readable format
 * @param {string} dateString - Date string to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Date(dateString).toLocaleDateString('en-US', mergedOptions);
};

/**
 * Calculate reading time for content
 * @param {string} content - The content to calculate reading time for
 * @param {number} wordsPerMinute - Reading speed in words per minute
 * @returns {string} Formatted reading time
 */
export const calculateReadingTime = (content, wordsPerMinute = 200) => {
  if (!content) return '0 min read';
  
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
};

/**
 * Truncate text to a specified length and add ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 150) => {
  if (!text || text.length <= length) return text;
  
  return text.slice(0, length).trim() + '...';
};

/**
 * Get YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} YouTube video ID or null if not found
 */
export const getYoutubeId = (url) => {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Group array items by a specified key
 * @param {Array} array - Array to group
 * @param {string} key - Object key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate a random string (useful for keys, IDs, etc.)
 * @param {number} length - Length of the random string
 * @returns {string} Random string
 */
export const generateRandomString = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Safely parse JSON with error handling
 * @param {string} json - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*} Parsed object or fallback value
 */
export const safeJsonParse = (json, fallback = {}) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback;
  }
};

/**
 * Create slug from a string (for URLs, IDs, etc.)
 * @param {string} text - Text to convert to slug
 * @returns {string} Slugified text
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/&/g, '-and-')     // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
};
