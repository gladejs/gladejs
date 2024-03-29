## [0.7.3](https://github.com/gladejs/gladejs/compare/gladejs-v0.7.2...gladejs-v0.7.3) (2021-08-12)


### Bug Fixes

* **@eleventy:** normalize paths & drives on Windows ([1461477](https://github.com/gladejs/gladejs/commit/146147753d4651ba10b7645d97e5b19437d01dca))
* **@rollup:** add filters to the "chunking" functions ([2dc0c66](https://github.com/gladejs/gladejs/commit/2dc0c664324c7d689c0bce73fc4dcabb30420848))
* **@rollup:** normalize paths in "static server" code ([e9d7753](https://github.com/gladejs/gladejs/commit/e9d7753ed937965cb0c373ca2f9c73fe21252d91))
* **deps:** bump all deps to their latest version ([1530859](https://github.com/gladejs/gladejs/commit/1530859b7a828a9cc0ee6358b5a616602505ae22))

## [0.7.2](https://github.com/gladejs/gladejs/compare/gladejs-v0.7.1...gladejs-v0.7.2) (2021-07-02)


### Bug Fixes

* **deps:** minor version bumps for public release ([481eaa7](https://github.com/gladejs/gladejs/commit/481eaa7f743a2d74d4788b00a7b70264856aabf5))

## [0.7.1](https://github.com/gladejs/gladejs/compare/gladejs-v0.7.0...gladejs-v0.7.1) (2021-06-26)


### Bug Fixes

* **@rollup:** declare "gladejs-rollup" in exports ([9f895e6](https://github.com/gladejs/gladejs/commit/9f895e657a92b7e05eee1930500b4be868b5f56b))
* **gladejs:** bump "@gladejs/rollup" for latest fix ([7716fce](https://github.com/gladejs/gladejs/commit/7716fcebedc4bc2423751d99c0f92604136eb095))

# [0.7.0](https://github.com/gladejs/gladejs/compare/gladejs-v0.6.3...gladejs-v0.7.0) (2021-06-26)


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

## [0.6.3](https://github.com/gladejs/gladejs/compare/gladejs-v0.6.2...gladejs-v0.6.3) (2021-05-05)


### Bug Fixes

* **@rollup:** move the CSS_FILTER const to "utils" ([7ce22bc](https://github.com/gladejs/gladejs/commit/7ce22bcfe0869c25552f12fd549724d9f2b0549a))
* **config:** flatten the config & export at the end ([e9a89a1](https://github.com/gladejs/gladejs/commit/e9a89a12bb8c7fbaae04f0337df4c83a60c49037))
* **gladejs:** revert node-resolve plugin to 11.2.1 ([faae603](https://github.com/gladejs/gladejs/commit/faae6035d675a6b9a81e59cd73c0d333896cb84a))
* **gladejs:** update Marko and Rollup dependencies ([384bb3f](https://github.com/gladejs/gladejs/commit/384bb3fc74636071c41b96bbe2c74b20a31df601))

## [0.6.2](https://github.com/gladejs/gladejs/compare/gladejs-v0.6.1...gladejs-v0.6.2) (2021-04-27)


### Bug Fixes

* **@eleventy:** add input sanity checks in options ([5dada6f](https://github.com/gladejs/gladejs/commit/5dada6f582c2ba28a25cf5950399220c66ae4628))
* **@rollup:** use ".mjs" for the static server file ([0f75235](https://github.com/gladejs/gladejs/commit/0f75235e37b98991ae956b412632efe24748493a))
* **gladejs:** use ".mjs" for the static watch opts ([7083353](https://github.com/gladejs/gladejs/commit/7083353e6a215da8e46530c423bd69e784c0a417))

## [0.6.1](https://github.com/gladejs/gladejs/compare/gladejs-v0.6.0...gladejs-v0.6.1) (2021-04-27)


### Bug Fixes

* **gladejs:** bump packages & npm ignore "/public" ([471364a](https://github.com/gladejs/gladejs/commit/471364a3e5aff0f639002e985db14690611b9cad))

# [0.6.0](https://github.com/gladejs/gladejs/compare/gladejs-v0.5.1...gladejs-v0.6.0) (2021-04-27)


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

## [0.5.1](https://github.com/gladejs/gladejs/compare/v0.5.0...v0.5.1) (2020-12-17)


### Bug Fixes

* **11ty:** support for Windows input/output paths ([c7f2441](https://github.com/gladejs/gladejs/commit/c7f2441c4b481a82580662eb22069585a91cf03b))

# [0.5.0](https://github.com/gladejs/gladejs/compare/v0.4.3...v0.5.0) (2020-12-14)


### Bug Fixes

* **config:** run the Visualizer in Prod only again ([f0e1dfd](https://github.com/gladejs/gladejs/commit/f0e1dfda62811db5c42deeb246b028516de1bdaf))
* **config:** switch to CommonJS completely ([0863da7](https://github.com/gladejs/gladejs/commit/0863da7e4cb33c60743fb3898683ff736c426962))
* **config:** update Assets include list to add WebP ([fa29ffc](https://github.com/gladejs/gladejs/commit/fa29ffcd9c26e3fc480b7e4b5a8ee69afa2ab211))
* **deps:** refresh dependencies & force a release ([cb89afb](https://github.com/gladejs/gladejs/commit/cb89afb6bf8b3dad4466b0d281ae7814aca83072))


### Features

* **marko:** upgrade to Marko v5 & drop v4 support ([a49501c](https://github.com/gladejs/gladejs/commit/a49501cacdf6f5f91cb1e612f2437ece9ff88e06))

## [0.4.3](https://github.com/gladejs/gladejs/compare/v0.4.2...v0.4.3) (2020-10-05)


### Bug Fixes

* **deps:** minor version updates to dependencies ([43c6c58](https://github.com/gladejs/gladejs/commit/43c6c584684b6ed54599e2a5dce37ccac92b5bbf))

## [0.4.2](https://github.com/gladejs/gladejs/compare/v0.4.1...v0.4.2) (2020-09-14)


### Bug Fixes

* **live:** support Rollup Live mode ( "--watch" ) ([07112e1](https://github.com/gladejs/gladejs/commit/07112e1911d0dce6e480fec91a21ba9b34e17f55)), closes [#6](https://github.com/gladejs/gladejs/issues/6)

## [0.4.1](https://github.com/gladejs/gladejs/compare/v0.4.0...v0.4.1) (2020-08-20)


### Bug Fixes

* **11ty:** improve Eleventy's integration & config ([649131f](https://github.com/gladejs/gladejs/commit/649131f03641620e674a05531be53ae2a7676842)), closes [#12](https://github.com/gladejs/gladejs/issues/12)

# [0.4.0](https://github.com/gladejs/gladejs/compare/v0.3.1...v0.4.0) (2020-08-07)


### Bug Fixes

* **deps:** remove the official Rollup "json" plugin ([70a47fa](https://github.com/gladejs/gladejs/commit/70a47fa6ab81870756277c5f4d08306d0de7f6d6))
* **rollup:** rename the Visualizer output file ([2a31349](https://github.com/gladejs/gladejs/commit/2a31349d7d4f3d6507b9a456640bb6c9fd154ecd))


### Features

* **11ty:** integrate Eleventy as first build step ([cfca8cc](https://github.com/gladejs/gladejs/commit/cfca8cce576b20b48432776213ed5c3310701edc))

## [0.3.1](https://github.com/gladejs/gladejs/compare/v0.3.0...v0.3.1) (2020-05-22)


### Bug Fixes

* **asset:** register the compiler hook correctly ([abe8332](https://github.com/gladejs/gladejs/commit/abe83325e85ffe426c6c78e635c5cac1c05b2e8f)), closes [#5](https://github.com/gladejs/gladejs/issues/5)

# [0.3.0](https://github.com/gladejs/gladejs/compare/v0.2.0...v0.3.0) (2020-05-13)


### Bug Fixes

* **asset:** support web pages without any asset ([41634b7](https://github.com/gladejs/gladejs/commit/41634b7c9a0574f8ed1c994db2c8d4c5eb52cf28))
* **asset:** switch quotes type for Windows path backslash ([9c4a38e](https://github.com/gladejs/gladejs/commit/9c4a38e6ab35d2a4d47a64379150afca201cb872))
* **build:** add Node version & OS support metadata ([299ed67](https://github.com/gladejs/gladejs/commit/299ed67dc46d84d6322e4e5cd9a3cdfa8c62aab1))
* **build:** update & dedupe dependencies correctly ([ac27a21](https://github.com/gladejs/gladejs/commit/ac27a21848154cbc447de1a4ddfe50432dd6bc14))
* **build:** update Rollup plugin for NodeJS v13.x ([ee1bf39](https://github.com/gladejs/gladejs/commit/ee1bf39d4d43012a2d54dbaa99cb433240f0ac74))
* **build:** update the "engines" support metadata ([9f23329](https://github.com/gladejs/gladejs/commit/9f233291ae53fae9d270dd08544eba18c2e0d44a))
* **deps:** cleanup & update NPM dependencies ([662a25c](https://github.com/gladejs/gladejs/commit/662a25c6c6f2ed09db28eb76ed9d253fbff409b9))
* **docs:** improve the README file prior to release ([bb9b41e](https://github.com/gladejs/gladejs/commit/bb9b41edde883253f13952b100f5b70b1f61b554))
* **glade:** move the Rollup plugin in its own repo ([8ec9890](https://github.com/gladejs/gladejs/commit/8ec98902675c21146130da0820eae83c88519bf4))
* **glade:** replace "fromEntries" to support Node v10 ([94b31b6](https://github.com/gladejs/gladejs/commit/94b31b6ca4144ce12cc25cf8a5b147042c708847))
* **glade:** small updates to Rollup plugins config ([ef28774](https://github.com/gladejs/gladejs/commit/ef2877451f87d95ae89945ebba8dd988b3a50838))
* **glade:** update the Visualizer plugin & config ([6f40311](https://github.com/gladejs/gladejs/commit/6f40311a7620fcc3e6773aed6d25fbd8f187d7fe))
* **rollup:** remove unnecessary "watch" options ([28706e5](https://github.com/gladejs/gladejs/commit/28706e5635542605b4b19758b6614f916ac6463d))
* **rollup:** rename the Rollup config for Node v13 ([26d9d4e](https://github.com/gladejs/gladejs/commit/26d9d4e9b8ec45b4dfca3b713f9e5441fe3a306e))
* **rollup:** replace the Brotli Rollup plugin ([a46fc89](https://github.com/gladejs/gladejs/commit/a46fc89e931d78f75a846b6b5b433b0985f82f7f))
* **rollup:** support for Windows JS & asset paths ([91a680e](https://github.com/gladejs/gladejs/commit/91a680e554ef779d9e38e196a724670b99478adb))


### Features

* **build:** support Rollup v2 & proper type metas ([2cea10f](https://github.com/gladejs/gladejs/commit/2cea10f1328475a4e3ae5bfb9fdc3a7b00a9e52c))
* **glade:** improve scripts & env variables handling ([8a00181](https://github.com/gladejs/gladejs/commit/8a00181cde6ea4b56562c24e966fd3177cc52a0a)), closes [#2](https://github.com/gladejs/gladejs/issues/2)
* **rollup:** upgrade to Rollup v2 & clean up deps ([f4033c7](https://github.com/gladejs/gladejs/commit/f4033c7c5e95f74b5d64ce45859cc6083cfdb457))
