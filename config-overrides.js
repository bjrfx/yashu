module.exports = function override(config, env) {
  // Find the PostCSS loader
  const postCSSLoader = config.module.rules
    .find(rule => Array.isArray(rule.oneOf))
    .oneOf.find(rule => rule.test && rule.test.toString().includes('.css'))
    .use.find(use => use && use.options && use.options.postcssOptions);
  
  // If found, modify it to skip Tailwind
  if (postCSSLoader) {
    postCSSLoader.options.postcssOptions = {
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    };
  }
  
  return config;
};