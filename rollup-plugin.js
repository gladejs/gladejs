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

            return options;
        },

        generateBundle(_, bundle) {
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

                let rendered = template.renderToString({ module: file, styles: styles });
                this.emitFile({ type: 'asset', fileName: file.name + '.html', source: rendered });
            });

            Object.values(bundle).forEach(entry => {
                if (entry.code == '') delete bundle[entry.fileName];
            });
        }
    };
}
