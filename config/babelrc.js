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
      '@babel/preset-stage-0',
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: [
      'transform-decorators-legacy',
      [
        '@babel/transform-runtime',
        {
          helpers: true,
          polyfill: false,
          regenerator: false,
          moduleName: '@babel/runtime',
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
