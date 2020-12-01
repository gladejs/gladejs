<p align="center">
    <a href="https://gladejs.com" rel="nofollow">
        <img width="240" alt="GladeJS Logo" src="https://raw.githubusercontent.com/gladejs/gladejs/master/pages/logos/gladejs-hsl.svg">
    </a>
</p>

<br/><hr/>

<h3 align="center">Helping Marko to Roll Uphill, Pass the CaScadeS and reach the GladeJS at 11' for Tea.</h3>

<hr/><br/>

<p align="center">
    <a href="https://www.npmjs.com/package/gladejs" rel="nofollow">
        <img alt="NPM Version" src="https://badgen.net/npm/v/gladejs">
    </a>
    &nbsp;
    <a href="https://github.com/prettier/prettier">
        <img alt="Code Formatter" src="https://badgen.net/badge/code%20format/prettier/ff69b4">
    </a>
    &nbsp;
    <a href="https://standardjs.com" rel="nofollow">
        <img alt="JavaScript Style" src="https://badgen.net/badge/code%20style/standard/green">
    </a>
    &nbsp;
    <a href="https://github.com/semantic-release/semantic-release">
        <img alt="Semantic Release" src="https://badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic-release/e10079">
    </a>
    &nbsp;
    <a href="https://app.netlify.com/sites/main-gladejs-site/deploys" rel="nofollow">
        <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/8e4756b1-ba23-45b4-a9ab-6fb041c40056/deploy-status">
    </a>
    &nbsp;
</p>

<p align="center">
    <a href="https://github.com/gladejs/gladejs/releases">
        <img alt="Latest Release" src="https://badgen.net/github/release/gladejs/gladejs">
    </a>
    &nbsp;
    <a href="https://github.com/gladejs/gladejs/actions">
        <img alt="Actions Checks" src="https://badgen.net/github/checks/gladejs/gladejs">
    </a>
    &nbsp;
    <a href="https://github.com/gladejs/gladejs/blob/master/LICENSE">
        <img alt="GitHub License" src="https://badgen.net/github/license/gladejs/gladejs">
    </a>
    &nbsp;
    <a href="https://github.com/gladejs/gladejs/commits/next">
        <img alt="Latest Commits" src="https://badgen.net/github/last-commit/gladejs/gladejs/next">
    </a>
    &nbsp;
</p>

## Description

GladeJS is a simple [Rollup](https://rollupjs.org) setup for bundling static Web Sites built with [Eleventy](https://www.11ty.dev) and [Marko](https://markojs.com).

If the above description does not speak to you, try one of these for size :

-   This is a [Jamstack](https://jamstack.org) static site generator framework based on Rollup
-   It transforms your "pages" into a modern web "\_site" ready for Prod
-   It is the best bundler (you're not using) combined with the simplest<br/>
    SSG (you want to use) and the fastest UI lib (you've never heard of)
-   In the end, it is nothing more than a well documented Rollup config file

Or maybe listing what _it's not_ and _doesn't do_ will give you a better idea :

-   This _is not_ yet another framework to learn (the CLI is Rollup's, the configuration is Eleventy's)
-   The tools _are not_ hidden, you interact directly with Eleventy, PostCSS, Terser, html-minifier, ...
-   It _does not_ force any JS in the output (unless you use Marko's client-side components, of course)
-   You _will not_ find any mention of SSR, SPA, routes, servers, nor any GladeJS special API or "\<Link\>"

This project requires [NodeJS](https://nodejs.org) v10.16 or superior and the included "npm" CLI v6.9.0 or superior.<br/>
It is tested on the latest versions of NodeJS v10 / v12 / v14 on MacOS, Ubuntu and Windows.

## Installation

The complete installation instructions are in this section, don't look for any more details, it's all here.

### Automatic (not ready yet)

An automated & interactive "@gladejs/create" package is planned for the v0.5 release.<br/>
It will allow for a simple "`npm init @gladejs MyWebSite`" installation, but not yet.

### Manual (in 3 easy steps)

1. Create a new NodeJS project & install GladeJS as a "devDependency" :

```bash
mkdir MyWebSite && cd MyWebSite

npm init -y && npm i -D gladejs
```

2. Replace the "scripts" section in your new "`package.json`" file with :

```json
"scripts": {
    "start": "rollup -c --watch",
    "clean": "rimraf build _site bundle_stats.html",
    "build": "rollup -c --environment NODE_ENV:production"
},
```

3. Copy the GladeJS Rollup configuration file into your project folder :

```bash
npx shx cp node_modules/gladejs/rollup.config.js .
```

## Documentation

The bare minimum to get you started is here, but you'll find detailed information in the ["docs" folder](./docs).

### Rollup Configuration

A single "`rollup.config.js`" file is used to configure your build process.<br/>
If you are not a NodeJS and/or Rollup guru, fret not, the defaults are just fine.<br/>
Nevertheless, [give it a quick glance](./rollup.config.js), it's relatively organised and documented.

### NPM Command Scripts

GladeJS is directly controlled via NPM scripts, using the following commands :

-   "`npm start`" to run Rollup in 'watch' mode for live development
-   "`npm run build`" to bundle your project for production delivery
-   "`npm run clean`" to delete all files & folders created by GladeJS

### Pages & Components

The [GladeJS homepage](https://gladejs.com) is under construction and will provide detailed documentation & guidelines for the project.<br/>
In the meantime, just let a [floating possum guide you around Eleventy](https://www.11ty.dev/docs/) and as always [RTFMD (Read The Fabulous Marko Docs)](https://markojs.com/docs/getting-started/).

## Contributing

While still in early development, everything is in place to receive your contributions.

-   Get acquainted with the project [PHILOSOPHY](./PHILOSOPHY.md) and general direction
-   Consult the [ROADMAP](./ROADMAP.md) to see where things stand and what's the master plan
-   Look for low hanging fruits in the ["Open Issues Status"](https://github.com/gladejs/gladejs/projects/1) project board
-   Read the [CONTRIBUTING](./CONTRIBUTING.md) guidelines carefully, they are short and to the point
