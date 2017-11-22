const path = require('path');

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
      ]
    }
  },
  components: './module/components/**/*.{js,jsx}',
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  require: [
    path.join(__dirname, 'public/css/bundle.css'),
  ]
};