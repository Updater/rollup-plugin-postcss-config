# rollup-plugin-postcss-config
[![Build Status](https://travis-ci.org/Updater/rollup-plugin-postcss-config.svg?branch=master)](https://travis-ci.org/Updater/rollup-plugin-postcss-config) [![npm](https://img.shields.io/npm/v/rollup-plugin-postcss-config.svg)](https://www.npmjs.com/package/rollup-plugin-postcss-config) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Transform [`PostCSS`](https://github.com/postcss/postcss) in [`Rollup`](https://github.com/rollup/rollup) using options from a config file.

## Install
```bash
npm install -D rollup-plugin-postcss-config
```

## Usage

### Configuration
Define PostCSS transform options, like plugins, in `postcss.config.js`.

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'postcss-reporter': {},
  },
};
```

See [`postcss-load-config`](https://github.com/michael-ciniawsky/postcss-load-config) for more options.

### Rollup
This plugin **makes no assumptions** about what to do with the transformed CSS. Another plugin has to follow to consume its output.

In the following example `rollup.config.js`, the transformed CSS is converted to a string using [`rollup-plugin-string`](https://github.com/TrySound/rollup-plugin-string):

```js
import postcss from 'rollup-plugin-postcss-config';
import string from 'rollup-plugin-string';

export default {
  plugins: [
    postcss({
      // Default value, can be omitted.
      include: '*.css', 
      // Undefined by default.
      exclude: 'node_modules/**',
    }),
    string({
      include: '*.css',
      exclude: 'node_modules/**',
    }),
  ],
};

```