<p align="center">
    <a href="https://gladejs.com" rel="nofollow">
        <img width="240" alt="GladeJS Logo" src="https://raw.githubusercontent.com/gladejs/gladejs/main/pages/logos/gladejs.svg">
    </a>
</p>

<br/><hr/>

<h3 align="center">Helping Marko to Roll Uphill, Pass the CaScadeS and reach the GladeJS at 11' for Tea.</h3>

<hr/><br/>

<p align="center">
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
    <a href="https://www.npmjs.com/package/gladejs" rel="nofollow">
        <img alt="Latest Version" src="https://badgen.net/npm/v/gladejs">
    </a>
    &nbsp;
</p>

<p align="center">
    <a href="https://github.com/gladejs/gladejs/blob/main/LICENSE">
        <img alt="GitHub License" src="https://badgen.net/github/license/gladejs/gladejs">
    </a>
    &nbsp;
    <a href="https://github.com/gladejs/gladejs/actions">
        <img alt="Actions Checks" src="https://badgen.net/github/checks/gladejs/gladejs">
    </a>
    &nbsp;
    <a href="https://github.com/gladejs/gladejs/commits/next">
        <img alt="Latest Commits" src="https://badgen.net/github/last-commit/gladejs/gladejs/next">
    </a>
    &nbsp;
    <a href="https://app.netlify.com/sites/main-gladejs-site/deploys" rel="nofollow">
        <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/8e4756b1-ba23-45b4-a9ab-6fb041c40056/deploy-status">
    </a>
    &nbsp;
</p>

## Description

GladeJS is a simple [Rollup](https://rollupjs.org) setup for bundling Web Sites built with [Marko](https://markojs.com) and [Eleventy](https://www.11ty.dev).

If the above description does not speak to you, try one of these for size :

-   This is a [Jamstack](https://jamstack.org) dual _SSG / SSR_ frontend framework using Rollup
-   It transforms your "pages" into a modern web "\_site" ready for Prod
-   It is the best bundler (you're not using) combined with the simplest \
    SSG (you want to use) and the fastest UI lib (you've never heard of)
-   In the end, it is nothing more than a well documented Rollup config

Or maybe listing what _it's not_ and _doesn't do_ will give you a better idea :

-   This _is not_ yet another framework to learn (the CLI is Rollup's, the configuration is Eleventy's)
-   The tools _are not_ hidden, you interact directly with Eleventy, PostCSS, Terser, Babel, CSSnano,...
-   It _does not_ force any JS in the output (unless you use Marko's client-side components, of course)
-   You _will not_ find any mention of SPA, routes, servers, nor any GladeJS special API or `<Link>` tag

This project requires [NodeJS](https://nodejs.org) v14.x or superior and the included "npm" CLI v6.14 or superior. \
It is tested on the latest versions of NodeJS v14, v15 & v16 on MacOS, Ubuntu and Windows.

## Installation

The complete installation instructions are in this section, don't look for any more details, it's all here.

### Automatic (not ready yet)

A "@gladejs/create" automatic initialization package is planned for the v1.0 release. \
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
    "vite": "rollup -c --watch --environment VITE_ENV",
    "live": "rollup -c --watch",
    "build": "rollup -c",
    "clean": "rimraf build _site",
    "build:prod": "rollup -c --environment NODE_ENV:production"
},
```

3. Copy the GladeJS Rollup configuration file into your project folder :

```bash
npx shx cp node_modules/gladejs/rollup.config.mjs .
```

## Documentation

The bare minimum to get you started is here, but you'll find detailed information in the ["docs" folder](./docs/).

### Rollup Configuration

A single "`rollup.config.mjs`" file is used to configure your build process. \
If you are not a NodeJS and/or Rollup guru, fret not, the defaults are just fine. \
Nevertheless, [give it a quick glance](./rollup.config.mjs), it's relatively organised and documented.

### NPM Command Scripts

GladeJS is directly controlled via NPM scripts, using the following commands :

-   "`npm run vite`" to run ViteJS "watch mode" for fast development
-   "`npm run live`" to run Rollup "watch mode" for live development
-   "`npm run build`" to bundle your project without any minification
-   "`npm run clean`" to delete all files & folders created by GladeJS
-   "`npm run build:prod`" to bundle your project **with** minification

### Pages & Components

The files & folders structure is marked by a distinctive lack of imagination :

-   Web Pages go into the "`pages`" input dir and Marko UI Components into the "`components`" dir.
-   There is "`layouts`" for 11ty Layouts, "`includes`" for Includes and "`datastores`" for Data Files.
-   CSS Styles are picked up from any "`style.{css|less|sass|scss|styl}`" file placed right next to any \
    "`index.{html|md|marko|11ty.js|liquid|njk|hbs|mustache|ejs|haml|pug|jstl}`" page.
-   Static assets can be pulled from anywhere on your disk, the NPM registry or the World Wide Web.

Now, enter [the GladeJS "docs"](./docs/), follow [the floating possum around 11ty](https://www.11ty.dev/docs/) or [RTFMD (Read The Fabulous Marko Docs)](https://markojs.com/docs/getting-started/).

## Contributing

While still in early development, everything is in place to receive your contributions.

-   Get acquainted with the project [PHILOSOPHY](./PHILOSOPHY.md) and general direction
-   Consult the [ROADMAP](./ROADMAP.md) to see where things stand and what's the master plan
-   Look for low hanging fruits in the ["Open Issues Status"](https://github.com/gladejs/gladejs/projects/1) project board
-   Read the [CONTRIBUTING](./CONTRIBUTING.md) guidelines carefully, they are short and to the point

You are now ready to contribute, so ... where is the code ? Mostly in another castle, Mario.

-   The [core engine](./rollup.config.mjs) is here, but it is more configuration than source code
-   The [integration tests](./tests/) are here, but they are more documentation than test
-   The [documentation dir](./docs/) is here and contains the actual meat of this project
-   The ["@gladejs/eleventy"](./packages/eleventy/) package integrates 11ty into Rollup for GladeJS
-   The ["@gladejs/rollup"](./packages/rollup/) package contains all of the necessary glue code

Finally, GladeJS relies on over 22 major OSS projects, including 7 Rollup plugins, \
contributing to any of them, not only benefits this project, but also many others.
