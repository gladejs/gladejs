'use strict'

const utils = require('../utils.js')

describe('requires a "page" to build', () => {
    beforeAll(() => {
        process.chdir(__dirname)
    })

    afterEach(async () => {
        await utils.runCleanup('pages', 'build', '_site')
    })

    test.todo('warns if the "pages" folder is missing')

    test.todo('warns if the "pages" folder is empty')

    it('builds an "Hello World" index page', async () => {
        await utils.writeFile('pages/index.html', '<h1>Hello World !</h1>')
        await utils.runRollup('../../rollup.config.js')

        const index = await utils.readFile('_site/index.html')
        expect(index).toMatchInlineSnapshot(`"<h1>Hello World !</h1>"`)
    })
})
