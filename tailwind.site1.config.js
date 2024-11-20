const baseConfig = require('./tailwind.config.js');

module.exports = {
  ...baseConfig,
  theme: {
    extend: {
      colors: {
        primaryDark: '#1a202c',
        secondaryDark: '#2d3748',
        primaryAccent: '#ed8936',
        secondaryAccent: '#d69e2e',
      },
    },
  },
};
