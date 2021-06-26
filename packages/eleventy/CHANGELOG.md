# [0.7.0](https://github.com/gladejs/gladejs/compare/eleventy-v0.6.1...eleventy-v0.7.0) (2021-06-26)


### Bug Fixes

* **@rollup:** clean up empty "css" output folders ([a425fa8](https://github.com/gladejs/gladejs/commit/a425fa88a8274a81c27e8bab37b46adebc9cf1b5))
* **@rollup:** correct the legacy bundle serialization ([818e2e1](https://github.com/gladejs/gladejs/commit/818e2e1aabf9e6ef6a005a460b85ff0f5a218185))
* **@rollup:** improve the "promisedStyle" handling ([446c300](https://github.com/gladejs/gladejs/commit/446c300679956107d1503517a4448748bbdb30aa))
* **@rollup:** improve the browser plugin init phase ([675ee96](https://github.com/gladejs/gladejs/commit/675ee963e58369d44f74c8ae74a960a9252564c5))
* **@rollup:** improve the JS & CSS assets handling ([4b7e516](https://github.com/gladejs/gladejs/commit/4b7e5160f26a959cdb58dab644296b0407148032))
* **@rollup:** improve the legacy plugin init phase ([ea75ada](https://github.com/gladejs/gladejs/commit/ea75ada156e9a4f103644daedea0e0f33cb51086))
* **@rollup:** modify the default "Unique Tag Id" ([9c80f43](https://github.com/gladejs/gladejs/commit/9c80f436b27048dad8015c7849f4d3c103a9a3b7))
* **@rollup:** move the CSS_FILTER const to "utils" ([7ce22bc](https://github.com/gladejs/gladejs/commit/7ce22bcfe0869c25552f12fd549724d9f2b0549a))
* **@rollup:** simplify the "serializer" implementation ([eed8fb0](https://github.com/gladejs/gladejs/commit/eed8fb0740c818ef46d8adf75c7a4bb3d0c2d76b))
* **@rollup:** simplify the default "stylesChunking" ([bac0a3d](https://github.com/gladejs/gladejs/commit/bac0a3d24ed6af559db1d3a0bcf6824ffd15685d))
* **@rollup:** upgrade to plugin-node-resolve v13 ([bb1e8aa](https://github.com/gladejs/gladejs/commit/bb1e8aac84c792673beebdea68c4da6706c11855))
* **config:** flatten the config & export at the end ([e9a89a1](https://github.com/gladejs/gladejs/commit/e9a89a12bb8c7fbaae04f0337df4c83a60c49037))
* **config:** reorder legacy config plugins correctly ([3dea83d](https://github.com/gladejs/gladejs/commit/3dea83d9a2eda2328df034757b02e36064f26b60))
* **gladejs:** revert node-resolve plugin to 11.2.1 ([faae603](https://github.com/gladejs/gladejs/commit/faae6035d675a6b9a81e59cd73c0d333896cb84a))
* **gladejs:** update Marko and Rollup dependencies ([384bb3f](https://github.com/gladejs/gladejs/commit/384bb3fc74636071c41b96bbe2c74b20a31df601))


### Features

* **@eleventy:** upgrade to Eleventy v1.0 Canary ([28341c9](https://github.com/gladejs/gladejs/commit/28341c9fe9f7ac0bbc3beedd050b5600df3fdfe1))
* **@rollup:** add legacy plugin for IE 11 support ([0aa3d82](https://github.com/gladejs/gladejs/commit/0aa3d825d154db3fe84b47720d4bb5fefd20150a))
* **@rollup:** add ViteJS based live mode support ([ced3b23](https://github.com/gladejs/gladejs/commit/ced3b232b8899c8dba6784d8eaaf98455f068a04))
* **@rollup:** create the easy "gladejs-rollup" tag ([175dce7](https://github.com/gladejs/gladejs/commit/175dce74639fd80bc5e5ab8cae4536ddbdcf767c))
* **@rollup:** implement CSS code-splitting support ([b19d02b](https://github.com/gladejs/gladejs/commit/b19d02b8aea1434f2d772dd5de5d8b3f26bef837))
* **@rollup:** support CSS scoping with scoped attr ([1f3bad7](https://github.com/gladejs/gladejs/commit/1f3bad7df10f1d2fa7d8af5702a7c2979ded2984))
* **gladejs:** add legacy config for IE 11 support ([7259c6d](https://github.com/gladejs/gladejs/commit/7259c6d504f594895db7c9417c295065773d1058))
* **gladejs:** add legacy config for IE 11 support ([d9c8275](https://github.com/gladejs/gladejs/commit/d9c8275268c6f07cf97e177a27448f757eba3de9))
* **gladejs:** update Rollup conf for CSS splitting ([c4390f8](https://github.com/gladejs/gladejs/commit/c4390f8905902e193f89fac556e4c38ed71c9208))
* **gladejs:** update Rollup conf for vite live mode ([8904b46](https://github.com/gladejs/gladejs/commit/8904b460fc71f722a35d431f51118a3b49124c0b))

## [0.6.1](https://github.com/gladejs/gladejs/compare/eleventy-v0.6.0...eleventy-v0.6.1) (2021-04-27)


### Bug Fixes

* **@eleventy:** add input sanity checks in options ([5dada6f](https://github.com/gladejs/gladejs/commit/5dada6f582c2ba28a25cf5950399220c66ae4628))
* **@rollup:** use ".mjs" for the static server file ([0f75235](https://github.com/gladejs/gladejs/commit/0f75235e37b98991ae956b412632efe24748493a))
* **gladejs:** bump packages & npm ignore "/public" ([471364a](https://github.com/gladejs/gladejs/commit/471364a3e5aff0f639002e985db14690611b9cad))
* **gladejs:** use ".mjs" for the static watch opts ([7083353](https://github.com/gladejs/gladejs/commit/7083353e6a215da8e46530c423bd69e784c0a417))

# [0.6.0](https://github.com/gladejs/gladejs/compare/eleventy-v0.5.0...eleventy-v0.6.0) (2021-04-27)


### Bug Fixes

* **gladejs:** improve scripts & rename config file ([9d39b20](https://github.com/gladejs/gladejs/commit/9d39b20405595a240e18581e208708571de43d36))
* **gladejs:** move logos around & rename them a bit ([a922527](https://github.com/gladejs/gladejs/commit/a922527a9e4d053e99504abd5327c0fdaecf40f7))
* **gladejs:** remove the Visualizer plugin for now ([dd1b116](https://github.com/gladejs/gladejs/commit/dd1b116a8c9c8103c51c97d95b8d1055b24cc2e7))
* **scripts:** improve & organize the NPM commands ([8ed3653](https://github.com/gladejs/gladejs/commit/8ed36538653211571c5333a0f9566d919cf8a17d))


### Features

* **@eleventy:** switch from "glob" to "fast-glob" ([8863461](https://github.com/gladejs/gladejs/commit/8863461bb91da7509157b2b783e186e4bff0a34a))
* **@eleventy:** switch to ESM code, except config ([e0540ae](https://github.com/gladejs/gladejs/commit/e0540ae374315b04ea5c5d540bbf97f66a128c8c))
* **@rollup:** complete rewrite for Marko plugin v3 ([1aa606c](https://github.com/gladejs/gladejs/commit/1aa606cdda8d18267ddceb57b62cc86e0e788e6e))
* **gladejs:** add support & tests for NodeJS v16 ([9cfbeea](https://github.com/gladejs/gladejs/commit/9cfbeea5a3db66a2c9e66564e119448f0d591708))
* **gladejs:** complete rewrite for Marko plugin v3 ([eefe6b7](https://github.com/gladejs/gladejs/commit/eefe6b75134585ed4c0a39813cecec284a1a8c15))
* **gladejs:** drop support for NodeJS v10 & v12 ([e1eeeb6](https://github.com/gladejs/gladejs/commit/e1eeeb67836a925d3613bcf453b9bfee860191f4))
* **gladejs:** switch to type "module" & ESM code ([2be0e28](https://github.com/gladejs/gladejs/commit/2be0e28473301c0430cd260f8d3d92c64a895e3a))

# [0.5.0](https://github.com/gladejs/eleventy/compare/v0.4.0...v0.5.0) (2020-12-27)


### Features

* **build:** archive & move to the GladeJS monorepo ([72e4d1d](https://github.com/gladejs/eleventy/commit/72e4d1d4e60ba0608d714f14edd08a3789d51e82))

# [0.4.0](https://github.com/gladejs/eleventy/compare/v0.3.3...v0.4.0) (2020-12-27)


### Features

* **deps:** last dependencies bump before archiving ([5a9c329](https://github.com/gladejs/eleventy/commit/5a9c3297dbc066875d214ab35c48332d7ffe20a5))

## [0.3.3](https://github.com/gladejs/eleventy/compare/v0.3.2...v0.3.3) (2020-12-17)


### Bug Fixes

* **windows:** 11ty wants paths in posix on Windows ([1bd8551](https://github.com/gladejs/eleventy/commit/1bd85510034a29804f83faa92c8199f9235ca546))

## [0.3.2](https://github.com/gladejs/eleventy/compare/v0.3.1...v0.3.2) (2020-12-14)


### Bug Fixes

* **deps:** refresh dependencies & force a release ([33ee88f](https://github.com/gladejs/eleventy/commit/33ee88f0a1f98fec94373634de332bb14d8bc29e))

## [0.3.1](https://github.com/gladejs/eleventy/compare/v0.3.0...v0.3.1) (2020-10-04)


### Bug Fixes

* **deps:** refresh all dependencies for release ([7753f1a](https://github.com/gladejs/eleventy/commit/7753f1ae4681e83825d961dc4b731b8e9edfcca2))

# [0.3.0](https://github.com/gladejs/eleventy/compare/v0.2.0...v0.3.0) (2020-08-28)


### Features

* **live:** support Rollup Live mode ( "--watch" ) ([66546bd](https://github.com/gladejs/eleventy/commit/66546bdf12e17dd3bc14a0de635988781d59235e))

# [0.2.0](https://github.com/gladejs/eleventy/compare/v0.1.0...v0.2.0) (2020-08-20)


### Features

* **11ty:** improve Eleventy's integration & config ([a9512b4](https://github.com/gladejs/eleventy/commit/a9512b47d4093d755520111ee8af483c5d6e4729))

# [0.1.0](https://github.com/gladejs/eleventy/compare/v0.0.1...v0.1.0) (2020-08-06)


### Features

* **build:** update deps prior to initial release ([c6e0041](https://github.com/gladejs/eleventy/commit/c6e0041f407fc9391c4b0e3fd11c285f5c64059b))
