const util = require('util')
const fs = require('fs')
const writeFile = util.promisify(require('fs').writeFile)
const readFile = util.promisify(require('fs').readFile)


const log = (tag, val) => {
	console.log(`[${tag}]`, val)
	return val
}

const api = log.bind(null, 'sniff')

api.tag = tag => log.bind(null, tag)
api.save = filename => val => writeFile(filename, JSON.stringify(val, null, 2)).then(() => {
	console.log(`sniffpro wrote to ${filename}`)
	return val
})
api.load = filename => readFile(filename).then(data => JSON.parse(data))
api.memo = (filename, fn) => fs.existsSync(filename) ? api.load(filename) : fn().then(api.save(filename))

module.exports = api
