# GladeJS

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://img.shields.io/npm/v/gladejs)](https://www.npmjs.com/package/gladejs)
[![GitHub License](https://img.shields.io/github/license/Glade-JS/gladejs)](./LICENSE)

## Description
A basic [Rollup](https://rollupjs.org/) setup for bundling static Web Sites built with [Marko](https://markojs.com/).

## Installation
Add GladeJS as a devDependency :
```bash
$ npm install --save-dev gladejs
```

### Command Scripts
Use the following in your "`package.json`" file :
```json
"scripts": {
    "start": "rollup -c -w",
    "build": "NODE_ENV='production' rollup -c",
    "clean": "rm -rf build && find . -name '*.marko.js' -delete"
},
```

### Rollup Configuration
Paste this one line in a new file named "`rollup.config.js`" to hide the magic :
```js
export { default } from './node_modules/gladejs/rollup.config';
```
... or copy the GladeJS config itself for the full mystical power of Rollup :
```sh
$ cp node_modules/gladejs/rollup*.js .
```

### Pages & Components
Have a look  at the [minimal index page](./pages/index.marko) and the [sample component](./components/counter.marko).

Finally, as always [RTFMD (Read The Fabulous Marko Documentation)](https://markojs.com/docs/getting-started/).
