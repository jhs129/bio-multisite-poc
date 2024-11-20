const baseConfig = require('./tailwind.config.js');

module.exports = {
  ...baseConfig,
  theme: {
    extend: {
      colors: {
        primaryDark: '#2d3748',
        secondaryDark: '#4a5568',
        primaryAccent: '#38a169',
        secondaryAccent: '#48bb78',
      },
    },
  },
};
