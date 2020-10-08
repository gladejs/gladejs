<br/>

<p align="center">
    <a href="https://gladejs.com" rel="nofollow">
        <img width="240" alt="GladeJS Logo" src="https://raw.githubusercontent.com/gladejs/gladejs/master/pages/logos/gladejs-hsl.svg">
    </a>
</p>

<br/><hr/><br/>

<h3 align="center">Helping Marko to Roll Uphill, Pass the CaScadeS and reach the GladeJS at 11' for Tea.</h3>

<br/><hr/><br/>

<p align="center">
    <a href="https://standardjs.com" rel="nofollow">
        <img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
    </a>
    &nbsp;
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
    </a>
    &nbsp;
    <a href="https://github.com/gladejs/gladejs/blob/master/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/gladejs/gladejs">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/package/gladejs" rel="nofollow">
        <img alt="NPM Version" src="https://img.shields.io/npm/v/gladejs">
    </a>
</p>

<br/>

## Description

GladeJS is a simple [Rollup](https://rollupjs.org) setup for bundling static Web Sites built with [Eleventy](https://www.11ty.dev) and [Marko](https://markojs.com).

If the above description does not speak to you, try one of these for size :

-   This is a [Jamstack](https://jamstack.org) static site generator framework based on Rollup
-   It transforms your "pages" into a modern web "\_site" ready for Prod
-   It is the best bundler (you're not using) combined with the simplest<br/>
    SSG (you wish to use) and the fastest UI lib (you've never heard of)
-   In the end, it is nothing more than a well documented Rollup config file

This project requires [NodeJS](https://nodejs.org) v10.16 or superior and the included "npm" CLI v6.9.0 or superior.<br/>
It is tested on the latest versions of NodeJS v10 / v12 / v14 on MacOS, Ubuntu and Windows.

## Installation

### Automatic (not ready yet)

An automated & interactive "@gladejs/create" package is planned for the v0.5 release.<br/>
It will allow for a simple "`npm init @gladejs MyWebSite`" installation, but not yet.

### Manual (in 4 easy steps)

1. Create a new NodeJS project & install GladeJS as a "devDependency" :

```bash
$ mkdir MyWebSite && cd MyWebSite
$ npm init -y && npm i -D gladejs
```

2. Copy the GladeJS Rollup configuration file into your project folder :

```bash
$ npx shx cp node_modules/gladejs/rollup.config.js .
```

3. Replace the "scripts" config section in your "`package.json`" with :

```json
"scripts": {
    "start": "rollup -c --watch",
    "clean": "rimraf build _site bundle_stats.html",
    "build": "rollup -c --environment NODE_ENV:production"
},
```

4. Copy the GladeJS documentation pages to start building right away :

```bash
$ npx shx cp -R node_modules/gladejs/pages .
```

## Documentation

### Command Scripts

GladeJS is directly controlled via NPM scripts, using the following commands :

-   "`npm start`" to run Rollup in 'watch' mode for live development
-   "`npm run build`" to bundle your project for production delivery
-   "`npm run clean`" to delete all files & folders created by GladeJS

### Rollup Configuration

A single "`rollup.config.js`" file is used to configure your build process.<br/>
If you are not a NodeJS and/or Rollup guru, fret not, the defaults are just fine.<br/>
Nevertheless, [give it a quick glance](./rollup.config.js), it's relatively organised and documented.

### Pages & Components

The [GladeJS homepage](https://gladejs.com) is under construction and will provide detailed documentation & guidelines for the project.<br/>
In the meantime, just let a [floating possum guide you around Eleventy](https://www.11ty.dev/docs/) and as always [RTFMD (Read The Fabulous Marko Docs)](https://markojs.com/docs/getting-started/).

## Contributing

While still in early development, you are welcome to consult the [ROADMAP.md](./ROADMAP.md) file and the ["Open Issues Status"](https://github.com/gladejs/gladejs/projects/1) project board.
