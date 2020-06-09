# Roadmap

This is an evolving roadmap / checklist / manifesto for the [GladeJS](https://gladejs.com) project.

## Framework
 - [X] [Marko](https://markojs.com) "pages" based routing system generating fully Server Side Rendered static HTML, CSS & JS
 - [X] Development mode with Live server using [Browsersync](https://www.browsersync.io) & performant file watching using [Chokidar](https://github.com/paulmillr/chokidar)
   - [ ] Create a PR for "@marko/rollup": just missing a few "addWatchFile()" for the full Hot-Reload
 - [X] Various graph representations of the JS bundle content & sizes using this [Visualizer plugin](https://github.com/btd/rollup-plugin-visualizer)
 - [ ] Detailed report of the whole website filesizes repartition & performance budget objectives
 - [ ] Clear and to the point error messages & warnings instead of cryptic stacktraces

## JS Bundle
 - [X] Support modern browsers with "module" script tags containing each page JS inlined & using standard imports
 - [ ] Support legacy browsers with "nomodule" script tags pointing to the full bundle file transpiled by [Babel](https://babeljs.io) / [Bublé](https://buble.surge.sh/guide/) ?
 - [X] Configurable [bundle chunking](https://github.com/gladejs/rollup/blob/9d21bc77d3a34a29f02c5a7a654cf4aefadfa529/dist/gladejs-rollup.js#L81) (default: "project" for components, "markojs" for the engine, "modules" for the rest)
 - [X] Tree-shaked JSON data file imports (... will probably add support for YAML, CSV & TSV ; is that all ?)
 - [X] Mangle & compress all JS code in Production using this ["Terser" plugin](https://github.com/TrySound/rollup-plugin-terser)
 - [ ] Format & indent all JS code in Live Mode using [StandardJS](https://standardjs.com)

## CSS Files
 - [X] Compile SASS & LESS, then funnel everything into one file using this ["PostCSS" plugin](https://github.com/egoist/rollup-plugin-postcss)
   - [X] Minify all CSS code in Production using the included ["CSS nano"](https://cssnano.co) support
   - [ ] Improve support for [PostCSS plugins](https://www.postcss.parts) (probably a few we want by default)
 - [ ] Find a way to re-split the CSS after minification automagically, per routes, manually ?
 - [ ] Inline the critical and above-the-fold CSS directly in each HTML pages (auto-manually ?)
 - [ ] Format & indent all CSS code in Live Mode using ... haven't researched it yet, suggestions ?

## HTML Pages
 - [X] [List all Marko "pages"](https://github.com/gladejs/rollup/blob/9d21bc77d3a34a29f02c5a7a654cf4aefadfa529/dist/gladejs-rollup.js#L66) from a single folder for the Rollup input, ignoring "components" sub-folders
 - [X] [Render each template](https://github.com/gladejs/rollup/blob/9d21bc77d3a34a29f02c5a7a654cf4aefadfa529/dist/gladejs-rollup.js#L38) with the CSS styles, client-side JS, page path Id & env variables as global data
 - [ ] Simplify HEAD block Meta configuration with a "glade-html-head" component & clear documentation
 - [ ] Markdown support as standard text entry, maybe even adding Marko component support to [MDX](https://mdxjs.com)
 - [X] Minify all HTML code in Production using ["html-minifier"](https://github.com/kangax/html-minifier) correctly configured & documented
 - [ ] Format & indent all HTML code in Live Mode using ... haven't researched it yet, suggestions ?

## Bin Assets
 - [X] Inline or copy image assets (cutoff is at 7 kb, good default ?) using the official "url" Rollup plugin
   - [X] Support publishing websites with a "publicPath" prefix for assets (JS & CSS paths are relative)
   - [ ] Extend the "url" plugin config to support WEPB, Fonts, video formats, 3D model formats, etc ...
   - [ ] Support for ".raw" extension to copy files blindly (e.g.; robots.txt.raw, .htaccess.raw, CNAME.raw)
 - [X] Automatic asset pulling using a [Marko compiler "transform" hook](https://github.com/gladejs/rollup/blob/9d21bc77d3a34a29f02c5a7a654cf4aefadfa529/tags/asset-transformer.js#L6) on all "src" attributes
   - [X] Pull relative assets with ".PATH" ==> src="./path/image.png" or src="../../path/logo.svg"
   - [ ] Pull project assets with "\~/DIR" ==> src="\~/assets/image.png" or src="\~/static/logo.svg"
   - [ ] Pull NodeJS assets with "~NAME" ==> src="~package/dist/assets/image.jpg"
   - [ ] Pull remote assets with "@URL" ==> src="@https://placekitten.com/200/300"
 - [X] Compress text files larger than 1 kb as GZIP & Brotli archives in Production using this [GZIP plugin](https://github.com/kryops/rollup-plugin-gzip)

## Components
 - [ ] Handle media compression, croping, resize, loading & output formats in the "glade-image" & "glade-video" components
 - [ ] Support for Web Workers & "off the main thread" JS (not sure about the API yet, but many solutions exist)
 - [ ] Service Worker integration (keeping that one secret, so nobody steals it before I can give it for free)
 - [ ] Support for Data Stores (I have an half-baked idea for an event-sourced CQRS/GIT/JSON based crazy system)
 - [ ] Marko tag libraries for popular solutions like Redux, Apollo GraphQL, Netlify, Zeit Now, Bootstrap, Material Design, Contentful, WordPress, etc ...

## Wish List
 - TypeScript support (as soon as it is available in Marko v5 ... v6 ?)
 - Proper sourcemaps for JS & CSS files (not sure if it's even possible)
 - Support for native [Web Components](https://www.webcomponents.org) (this might just work, to be tested)
 - Support for [CSS Modules](https://github.com/css-modules/css-modules) or some way of localizing CSS code per component
 - Support for parameterized & dynamic server routes via various server frameworks
 - Complete absence of Marko JS code in the "build" if no client-side hydration is necessary
 - Support & documentation for unit testing components, performance tracing, code linting, ... what else ?

## Questions
 - The Browsersync & html-minifier plugins are less than 10 lines each, worth publishing individually ?
 - Should "/pages/about.marko" become "/build/about.html" or magically "/build/about/index.html" ?
 - It looks like the PostCSS plugin supports the Stylus format & Marko could too, do we need/want it ?
