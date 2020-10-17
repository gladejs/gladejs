'use strict'

const fs = require('fs-extra')

const { executeCommand } = require('../utils.js')

describe('requires a minimal "page" to build', () => {
    beforeAll(() => {
        process.chdir(__dirname)
    })

    afterEach(async () => {
        await executeCommand('rimraf pages build _site')
    })

    test.todo('warns if the "pages" folder is missing')

    test.todo('warns if the "pages" folder is empty')

    it('builds an "Hello World" index page', async () => {
        await fs.outputFile('pages/index.html', '<h1>Hello World !</h1>')
        await executeCommand('rollup -c ../../rollup.config.js')

        const index = await fs.readFile('_site/index.html', 'utf-8')
        expect(index).toMatchInlineSnapshot(`"<h1>Hello World !</h1>"`)
    })
})
