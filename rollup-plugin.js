import path from 'path';
import glob from 'glob';

import 'marko/node-require';

export default () => {
    return {
        name: 'gladejs',

        options(options) {
            let input = path.resolve(options.input);

            let pages = glob.sync('*.marko', {
                matchBase: true, absolute: true,
                ignore: '**/components/**', cwd: input
            });

            options.input = Object.fromEntries(new Map(pages.map(page =>
                [page.substring(input.length + 1, page.length - 6), page]
            )));

            let manualChunks = options.manualChunks;
            options.manualChunks = (id) => {
                if (id.endsWith('|assets')) return 'assets';
                if (manualChunks) return manualChunks(id);
            };

            return options;
        },

        generateBundle(_, bundle) {
            let assets = Object.values(bundle).find(entry => entry.name == 'assets');
            let assetPaths = new Function('assets', assets.code + 'return assets;')([]);
            let assetReducer = (code, path) => code.replace(new RegExp(path[0], 'g'), path[1]);

            let styles = Object.values(bundle).filter(entry =>
                entry.isAsset && entry.fileName.endsWith('.css')
            ).map(file =>
                ({ href: '/' + file.fileName, code: file.source })
            );

            Object.values(bundle).filter(entry =>
                entry.isEntry && entry.facadeModuleId.endsWith('.marko')
            ).forEach(file => {
                let tagIndex = file.facadeModuleId.indexOf(':');
                let pagePath = file.facadeModuleId.substring(tagIndex + 1);

                delete require.cache[pagePath];
                let template = require(pagePath);

                file.code = file.code.replace(new RegExp("import '.*/" + assets.fileName + "';"), '');
                let rendered = template.renderToString({ module: file, styles: styles });

                this.emitFile({
                    type: 'asset', fileName: file.name + '.html',
                    source: assetPaths.reduce(assetReducer, rendered)
                });
            });

            assets.code = '';
            Object.values(bundle).forEach(entry => {
                if (entry.code == '') delete bundle[entry.fileName];
            });

            Object.values(bundle).forEach(entry => {
                if (entry.type == 'chunk') {
                    entry.code = assetPaths.reduce(assetReducer, entry.code);
                }
            });
        }
    };
}
