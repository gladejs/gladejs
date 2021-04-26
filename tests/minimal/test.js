import utils from '../utils.js'

describe('requires a "page" to build', () => {
    beforeAll(() => {
        utils.processDir(import.meta.url)
    })

    afterEach(async () => {
        await utils.runCleanup('pages', 'build', '_site')
    })

    test.todo('warns if the "pages" folder is missing')

    test.todo('warns if the "pages" folder is empty')

    it('builds an "Hello World" index page', async () => {
        await utils.writeFile('pages/index.html', '<h1>Hello World !</h1>')
        await utils.runRollup('../../rollup.config.mjs')

        const index = await utils.readFile('_site/index.html')
        expect(index).toMatchInlineSnapshot(`"<h1>Hello World !</h1>"`)
    })
})
