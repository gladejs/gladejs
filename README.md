# GladeJS

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub License](https://img.shields.io/github/license/gladejs/gladejs)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/gladejs)](https://www.npmjs.com/package/gladejs)

## Description
A basic [Rollup](https://rollupjs.org/) setup for bundling static Web Sites built with [Marko](https://markojs.com/) components.

## Installation
Create a new NodeJS project and install GladeJS as a "devDependency" :
```bash
$ mkdir example && cd example
$ npm init -y && npm i -D gladejs
```

### Command Scripts
Use the following scripts configuration in the new "`package.json`" file :
```json
"scripts": {
    "start": "rollup -c -w",
    "build": "NODE_ENV='production' rollup -c",
    "clean": "rimraf build **/*.marko.js && rimraf **/*.marko.js"
},
```

### Rollup Configuration
Paste this one line in a new file named "`rollup.config.js`" to hide the magic :
```js
export { default } from './node_modules/gladejs/rollup.config'
```
... or copy the GladeJS config itself for the full mystical power of Rollup :
```sh
$ cp node_modules/gladejs/rollup*.js .
```

### Pages & Components
Have a look  at the [minimal index page](./pages/index.marko) and the [sample component](./pages/components/counter.marko).

Finally, as always [RTFMD (Read The Fabulous Marko Documentation)](https://markojs.com/docs/getting-started/).