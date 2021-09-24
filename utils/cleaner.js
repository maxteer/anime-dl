const fs = require('fs')
const path = require('path')

fs.rmdirSync(path.resolve('dist'), {recursive: true})
