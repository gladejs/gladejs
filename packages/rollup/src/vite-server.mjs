// eslint-disable-next-line
import gladejs from '@gladejs/rollup'

import { createServer } from 'vite'
import markoVite from '@marko/vite'

import express from 'express'
import markoWare from '@marko/express'

import bs from 'browser-sync'

async function run(input) {
    gladejs.registerTagLib()

    const viteServer = await createServer({
        server: { middlewareMode: 'ssr' },
        plugins: [markoVite.default()],
    })

    express()
        .use(markoWare.default())
        .use(viteServer.middlewares)

        .use('/', express.static(input))
        .use('*', async (req, res, next) => {
            const url = gladejs.urlToMarkoFile(input + req.baseUrl)
            const ssr = await viteServer.ssrLoadModule(url, {
                fixStacktrace: true,
            })

            if (typeof ssr.default === 'string') next()
            else res.marko(ssr.default, {})
        })
        .listen(8080)

    bs.create('gladejs-vite').init({ proxy: 'localhost:8080' })
}

run(process.argv[2])
