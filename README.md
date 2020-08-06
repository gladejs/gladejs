# GladeJS

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub License](https://img.shields.io/github/license/gladejs/gladejs)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/gladejs)](https://www.npmjs.com/package/gladejs)

## Description

GladeJS is a simple [Rollup](https://rollupjs.org/) setup for bundling static Web Sites built with [Marko](https://markojs.com/) components.<br />

This project requires [NodeJS](https://nodejs.org/) v10.16 or superior and the included "npm" CLI v6.9.0 or superior.<br />
It is tested on the latest versions of NodeJS v10 / v12 / v14 on MacOS, Ubuntu and Windows.<br />

## Installation

### Automatic (not ready yet)
An automated & interactive "@gladejs/create" package is planned for the v0.4 release.<br />
It will allow for a simple "`npm init @gladejs MyWebSite`" installation, but not yet.

### Manual (in 4 easy steps)

1. Create a new NodeJS project and install GladeJS as a "devDependency" :
```bash
$ mkdir MyWebSite && cd MyWebSite
$ npm init -y && npm i -D gladejs
```

2. Replace the "scripts" config section in your new "`package.json`" with :
```json
"scripts": {
    "start": "rollup -c --watch",
    "clean": "rimraf build _site rollup_stats.html",
    "build": "rollup -c --environment NODE_ENV:production"
},
```

3. Copy the GladeJS Rollup configuration file itself into your project directory :
```bash
$ npx shx cp node_modules/gladejs/rollup.config.js .
```

4. Copy the GladeJS documentation Marko pages to start building right away :
```bash
$ npx shx cp -R node_modules/gladejs/pages .
```

## Documentation

### Command Scripts
GladeJS is directly controlled via NPM scripts, use the following commands :
 - "`npm start`" to run Rollup in 'watch' mode for live development
 - "`npm run build`" to bundle your project for production delivery
 - "`npm run clean`" to remove the build folder & 'rollup_stats.html'

### Rollup Configuration
A single "`rollup.config.js`" file is used to configure your build process.<br />
If you are not a NodeJS and/or Rollup guru, fret not, the defaults are just fine.<br />
Nevertheless, [give it a quick glance](./rollup.config.js), it's relatively organised and documented.

### Pages & Components
The [GladeJS website](https://gladejs.com/) is under construction and its source code will have comments to serve as guide.<br />
In the meantime, have a look  at the [minimal Index page](./pages/index.marko) and the [sample Marko component](./pages/components/counter.marko).<br />
And finally, as always [RTFMD (Read The Fabulous Marko Documentation)](https://markojs.com/docs/getting-started/).

## Contributing

While we are still in early development, you are welcome to consult the [ROADMAP.md](./ROADMAP.md)
