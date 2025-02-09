const path = require('path');

module.exports = {
  babel: {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
          fileName: false
        }
      ]
    ]
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}; 