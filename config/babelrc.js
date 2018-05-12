function babelrc(isBrowser = true) {
  return {
    presets: [
      [
        '@babel/preset-env', {
          modules: isBrowser ? false : 'commonjs',
          loose: isBrowser,
          targets: isBrowser ? { browsers: ['last 2 versions'] } : { node: 'current' },
        },
      ],
      [
        '@babel/preset-stage-0',
        {
          decoratorsLegacy: true,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          polyfill: false,
        },
      ],
    ],
    env: {
      test: {
        plugins: [
          'istanbul',
        ],
      },
    },
  };
}

// eslint-disable-next-line import/no-commonjs
module.exports = babelrc;
