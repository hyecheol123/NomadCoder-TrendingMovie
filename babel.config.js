module.exports = {
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        debug: true,
        targets: {
          browsers: ['defaults', '> 0.25% in KR', '> 0.25% in US'],
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    process.env.NODE_ENV !== 'production' && 'react-refresh/babel',
  ].filter(Boolean),
};
