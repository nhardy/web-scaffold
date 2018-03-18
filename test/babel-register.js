// eslint-disable-next-line import/no-commonjs
require('@babel/register')({
  ignore: [
    (filename) => {
      if (filename.includes('lodash-es')) return false;
      if (filename.includes('node_modules')) return true;
      return false;
    },
  ],
});
