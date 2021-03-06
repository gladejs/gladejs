import { server } from './src/gladejs-server.js'
import { browser, legacy } from './src/gladejs-browser.js'

import {
    serializer,
    moduleChunking,
    stylesChunking,
    registerTagLib,
    urlToMarkoFile,
} from './src/gladejs-utils.js'

export default {
    server,
    browser,
    legacy,
    serializer,
    moduleChunking,
    stylesChunking,
    registerTagLib,
    urlToMarkoFile,
}
