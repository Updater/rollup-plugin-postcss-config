const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const { createFilter } = require('rollup-pluginutils');

module.exports = function (options = {}) {
  // https://github.com/rollup/rollup-pluginutils#createfilter
  const filter = createFilter(options.include || '*.css', options.exclude);
  const config = postcssrc();

  return {
    name: 'postcss-config',
    transform: (code, id) => {
      if (!filter(id)) return;

      return config
        .then(({ plugins, options }) =>
          postcss(plugins).process(code, options),
          console.error,
        )
        .then(({ css: code, map }) =>
          ({ code, map }),
          console.error,
        );
    },
  };
};