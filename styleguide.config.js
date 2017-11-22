const path = require('path');
const pkg = 'package.json';

module.exports = {
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        }
      ],
      loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      }],
    }
  },
  components: './module/components/**/*.{js,jsx}',
  template: 'public/index.html',
  title: pkg['display-name']
};