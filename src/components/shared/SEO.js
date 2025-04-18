import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title,
  description,
  imageUrl,
  imageAlt,
  articlePublishedTime,
  articleModifiedTime,
  articleTags,
  type = 'website',
  twitterCardType = 'summary_large_image',
}) => {
  // Set default values
  const defaultTitle = 'Professional Actress Portfolio';
  const defaultDescription = 'Explore my acting journey, view my showreel, gallery, press mentions, and more.';
  const defaultImageUrl = 'https://yourportfolio.com/og-image.jpg';
  const defaultImageAlt = 'Actress Portfolio';
  const siteUrl = 'https://yourportfolio.com';

  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImageUrl = imageUrl || defaultImageUrl;
  const seoImageAlt = imageAlt || defaultImageAlt;
  
  // Current URL
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImageUrl} />
      <meta property="og:image:alt" content={seoImageAlt} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImageUrl} />
      <meta name="twitter:image:alt" content={seoImageAlt} />

      {/* Article specific metadata (if applicable) */}
      {type === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {type === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {type === 'article' && articleTags && articleTags.length > 0 && (
        articleTags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      )}
    </Helmet>
  );
};

export default SEO;
