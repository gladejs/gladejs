# [0.7.0](https://github.com/gladejs/gladejs/compare/rollup-v0.6.2...rollup-v0.7.0) (2021-06-26)


### Bug Fixes

* **@rollup:** clean up empty "css" output folders ([a425fa8](https://github.com/gladejs/gladejs/commit/a425fa88a8274a81c27e8bab37b46adebc9cf1b5))
* **@rollup:** correct the legacy bundle serialization ([818e2e1](https://github.com/gladejs/gladejs/commit/818e2e1aabf9e6ef6a005a460b85ff0f5a218185))
* **@rollup:** improve the "promisedStyle" handling ([446c300](https://github.com/gladejs/gladejs/commit/446c300679956107d1503517a4448748bbdb30aa))
* **@rollup:** improve the browser plugin init phase ([675ee96](https://github.com/gladejs/gladejs/commit/675ee963e58369d44f74c8ae74a960a9252564c5))
* **@rollup:** improve the JS & CSS assets handling ([4b7e516](https://github.com/gladejs/gladejs/commit/4b7e5160f26a959cdb58dab644296b0407148032))
* **@rollup:** improve the legacy plugin init phase ([ea75ada](https://github.com/gladejs/gladejs/commit/ea75ada156e9a4f103644daedea0e0f33cb51086))
* **@rollup:** modify the default "Unique Tag Id" ([9c80f43](https://github.com/gladejs/gladejs/commit/9c80f436b27048dad8015c7849f4d3c103a9a3b7))
* **@rollup:** simplify the "serializer" implementation ([eed8fb0](https://github.com/gladejs/gladejs/commit/eed8fb0740c818ef46d8adf75c7a4bb3d0c2d76b))
* **@rollup:** simplify the default "stylesChunking" ([bac0a3d](https://github.com/gladejs/gladejs/commit/bac0a3d24ed6af559db1d3a0bcf6824ffd15685d))
* **@rollup:** upgrade to plugin-node-resolve v13 ([bb1e8aa](https://github.com/gladejs/gladejs/commit/bb1e8aac84c792673beebdea68c4da6706c11855))
* **config:** reorder legacy config plugins correctly ([3dea83d](https://github.com/gladejs/gladejs/commit/3dea83d9a2eda2328df034757b02e36064f26b60))


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

## [0.6.2](https://github.com/gladejs/gladejs/compare/rollup-v0.6.1...rollup-v0.6.2) (2021-05-05)


### Bug Fixes

* **@rollup:** move the CSS_FILTER const to "utils" ([7ce22bc](https://github.com/gladejs/gladejs/commit/7ce22bcfe0869c25552f12fd549724d9f2b0549a))
* **config:** flatten the config & export at the end ([e9a89a1](https://github.com/gladejs/gladejs/commit/e9a89a12bb8c7fbaae04f0337df4c83a60c49037))
* **gladejs:** revert node-resolve plugin to 11.2.1 ([faae603](https://github.com/gladejs/gladejs/commit/faae6035d675a6b9a81e59cd73c0d333896cb84a))
* **gladejs:** update Marko and Rollup dependencies ([384bb3f](https://github.com/gladejs/gladejs/commit/384bb3fc74636071c41b96bbe2c74b20a31df601))

## [0.6.1](https://github.com/gladejs/gladejs/compare/rollup-v0.6.0...rollup-v0.6.1) (2021-04-27)


### Bug Fixes

* **@eleventy:** add input sanity checks in options ([5dada6f](https://github.com/gladejs/gladejs/commit/5dada6f582c2ba28a25cf5950399220c66ae4628))
* **@rollup:** use ".mjs" for the static server file ([0f75235](https://github.com/gladejs/gladejs/commit/0f75235e37b98991ae956b412632efe24748493a))
* **gladejs:** bump packages & npm ignore "/public" ([471364a](https://github.com/gladejs/gladejs/commit/471364a3e5aff0f639002e985db14690611b9cad))
* **gladejs:** use ".mjs" for the static watch opts ([7083353](https://github.com/gladejs/gladejs/commit/7083353e6a215da8e46530c423bd69e784c0a417))

# [0.6.0](https://github.com/gladejs/gladejs/compare/rollup-v0.5.0...rollup-v0.6.0) (2021-04-27)


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

# [0.5.0](https://github.com/gladejs/rollup/compare/v0.4.2...v0.5.0) (2020-12-27)


### Features

* **build:** archive & move to the GladeJS monorepo ([dbac0b2](https://github.com/gladejs/rollup/commit/dbac0b2324a3265e85563744887b079df3206694))

## [0.4.2](https://github.com/gladejs/rollup/compare/v0.4.1...v0.4.2) (2020-12-14)


### Bug Fixes

* **deps:** refresh dependencies & force a release ([0cae854](https://github.com/gladejs/rollup/commit/0cae854e1bce435d8beb776f6443a657b8886ce6))

## [0.4.1](https://github.com/gladejs/rollup/compare/v0.4.0...v0.4.1) (2020-10-05)


### Bug Fixes

* **asset:** compiler API updates in v5.0.0-next.49 ([f7864e0](https://github.com/gladejs/rollup/commit/f7864e03334d3592e683f466f1eeefd8b61345ce))

# [0.4.0](https://github.com/gladejs/rollup/compare/v0.3.3...v0.4.0) (2020-10-05)


### Bug Fixes

* **marko:** tweak the Marko compiler options ([b4cd205](https://github.com/gladejs/rollup/commit/b4cd205b6a7e2d1a977de9f8f5ce020180c45e32))


### Features

* **asset:** support Marko v5 transformer syntax ([22a2391](https://github.com/gladejs/rollup/commit/22a23910cea518a9a31b06d5d600d1f2be7e41b6))
* **marko:** support for the Marko v5 compiler ([43c1d23](https://github.com/gladejs/rollup/commit/43c1d237c07f7c05415f6a2e103dad877e3d1795))

## [0.3.3](https://github.com/gladejs/rollup/compare/v0.3.2...v0.3.3) (2020-08-28)


### Bug Fixes

* **live:** support Rollup Live mode ( "--watch" ) ([ac79031](https://github.com/gladejs/rollup/commit/ac790312ed3ab602b75d7d2fa7f9c0f3b48b025b))

## [0.3.2](https://github.com/gladejs/rollup/compare/v0.3.1...v0.3.2) (2020-08-02)


### Bug Fixes

* **deps:** update browser-sync & chokidar to v3.x ([e8e64f2](https://github.com/gladejs/rollup/commit/e8e64f2b14fea34871a79531f18f24de2503c9fd))

## [0.3.1](https://github.com/gladejs/rollup/compare/v0.3.0...v0.3.1) (2020-05-22)


### Bug Fixes

* **marko:** make sure our taglib is registered ([7630dba](https://github.com/gladejs/rollup/commit/7630dba2c8a0d5df0712a7be31b22786112f3ff2))

# [0.3.0](https://github.com/gladejs/rollup/compare/v0.2.2...v0.3.0) (2020-05-13)


### Bug Fixes

* **docs:** actually describe the repo in the README ([867a150](https://github.com/gladejs/rollup/commit/867a1502daa9368c99087589522b6744eac51e67))


### Features

* **fake:** just aligning the version number, ignore ([e7b1d4d](https://github.com/gladejs/rollup/commit/e7b1d4d07b32e0cbc4a20084acbbbe9a8706fcc4))

## [0.2.2](https://github.com/gladejs/rollup/compare/v0.2.1...v0.2.2) (2020-05-07)


### Bug Fixes

* **asset:** support web pages without any asset ([08815b7](https://github.com/gladejs/rollup/commit/08815b73c085345b308ad3eaaa99f67d82c991e0))
* **build:** put back the "dist" folder properly ([db35151](https://github.com/gladejs/rollup/commit/db351510f3aa6b15af6687c3c52ecd4ce05565fd))

## [0.2.1](https://github.com/gladejs/rollup/compare/v0.2.0...v0.2.1) (2020-04-28)


### Bug Fixes

* **build:** remove the "dist" folder for NodeJS v13 ([c586d11](https://github.com/gladejs/rollup/commit/c586d11b823a6c6b37f8fd63f9537eb98fbddf34))

# [0.2.0](https://github.com/gladejs/rollup/compare/v0.1.3...v0.2.0) (2020-04-28)


### Bug Fixes

* **build:** add Node version & OS support metadata ([bc6a625](https://github.com/gladejs/rollup/commit/bc6a6252335ea71a42faa2de095ec6d5e6666855))
* **build:** update peer deps for Rollup 2 & Marko 5 ([5cde3e3](https://github.com/gladejs/rollup/commit/5cde3e3fbc5a21176d46a22662dd0dd75db27c9f))
* **build:** update the "engines" support metadata ([1e5c27c](https://github.com/gladejs/rollup/commit/1e5c27c6e8fea57584383cee7acad6a537dc395d))
* **rollup:** do not check the "type" of CSS & HTML ([db05ec8](https://github.com/gladejs/rollup/commit/db05ec858092cd04fdee415da7cd8c956225f878))
* **rollup:** replace deprecated function in Rollup 2 ([0c6b7e2](https://github.com/gladejs/rollup/commit/0c6b7e2b36f8b489340ef4542325649cdae8ec07))


### Features

* **build:** support Rollup v2 & proper type metas ([0521c71](https://github.com/gladejs/rollup/commit/0521c71b494adb997b7cf5ae7755a42b7a0eced1))

## [0.1.3](https://github.com/gladejs/rollup/compare/v0.1.2...v0.1.3) (2020-04-06)


### Bug Fixes

* **asset:** support Windows paths for image assets ([28fd11d](https://github.com/gladejs/rollup/commit/28fd11d5e7124311a621d67b9aa263be2dca56d5))
* **glade:** support Windows paths in JS chunking ([0dcec81](https://github.com/gladejs/rollup/commit/0dcec81da3ab7f0439fb2c184f481d483bcc92dd))

## [0.1.2](https://github.com/gladejs/rollup/compare/v0.1.1...v0.1.2) (2020-04-02)


### Bug Fixes

* **rollup:** we need to modify the "exports" too ([e3358c3](https://github.com/gladejs/rollup/commit/e3358c331d213191c828460c6fa17dcd347e6c01))

## [0.1.1](https://github.com/gladejs/rollup/compare/v0.1.0...v0.1.1) (2020-04-02)


### Bug Fixes

* **ci/cd:** add the "next" branch to the CD workflow ([8eb0c1d](https://github.com/gladejs/rollup/commit/8eb0c1d0b71a43649ceca410bd39274a14342cbe))
* **rollup:** use "requires" inside Rollup plugins ([be1e016](https://github.com/gladejs/rollup/commit/be1e0162f9e829f5e9b6f2421b1fab8e59d2951b))

# [0.1.0](https://github.com/gladejs/rollup/compare/v0.0.1...v0.1.0) (2020-04-01)


### Bug Fixes

* **build:** add public access for the NPM release ([fd75800](https://github.com/gladejs/rollup/commit/fd75800ff4c42f0a90066dda4e5e88758db743f8))


### Features

* **build:** update all deps prior to initial release ([649b502](https://github.com/gladejs/rollup/commit/649b502687195412fc7e4dc7ca750435787ffa46))
