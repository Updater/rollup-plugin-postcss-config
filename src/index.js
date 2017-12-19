const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const { createFilter } = require('rollup-pluginutils');

module.exports = function (options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const config = postcssrc();

  return {
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