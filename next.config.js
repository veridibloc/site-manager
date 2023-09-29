const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);
const nextConfig = withNextIntl({
  experimental:{
    serverActions: true
  }
});

module.exports = nextConfig
