module.exports = {
  extends: [
    'next/core-web-vitals',
  ],
  rules: {
    // Disable the rule for unescaped entities like apostrophes
    'react/no-unescaped-entities': 'off',
  },
}; 