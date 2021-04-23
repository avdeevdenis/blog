const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
    [withCss],
    [withSass],
    [optimizedImages()]
]);
