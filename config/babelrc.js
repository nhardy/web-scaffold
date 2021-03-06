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
      '@babel/preset-stage-3',
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
      'babel-plugin-transform-decorators-legacy',
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
