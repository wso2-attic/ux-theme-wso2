const path = require('path');
const pkg = require('./package.json');

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
        },
        {
					test: /\.svg$/,
					loader: 'url-loader',
				},
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    }
  },
  components: './module/components/**/*.{js,jsx}',
  title: pkg['display-name'],
  showUsage: true,
  showCode: true,
  showSidebar: true,
  template: 'styleguide/index.html',
  styleguideComponents: {
		Logo: path.join(__dirname, 'styleguide/components/Logo'),
		StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuideRenderer')
	},
    
  sections: [
      {
          name: 'Layout',
          components: () => ([
              path.resolve(__dirname, 'module/components/Grid', 'index.js')
              ])
      },
      {
        name: 'Components',
        components: () => ([
            path.resolve(__dirname, 'module/components/Button', 'index.js'),
            path.resolve(__dirname, 'module/components/Chip', 'index.js'),
            path.resolve(__dirname, 'module/components/Avatar', 'index.js'),
            path.resolve(__dirname, 'module/components/Badge', 'index.js')
        ])
      },
  ]
};