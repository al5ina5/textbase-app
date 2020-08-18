const { ipcRenderer } = require('electron')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ posts: [], user: {}, count: 0 })
	.write()

const fs = require('fs-extra')
const chokidar = require('chokidar');
const recursive = require('recursive-readdir')
const { dialog, shell } = require('electron').remote
const shelljs = require('shelljs')

shelljs.cd(process.cwd())
shelljs.exec('textbase', (code, stdout, stderr) => {
	console.log(code)
	console.log(stdout)
	console.log(stderr)
})

process.once('loaded', () => {
	global.ipcRenderer = ipcRenderer
	global.db = db
	global.fs = fs
	global.chokidar = chokidar
	global.recursive = recursive
	global.dialog = dialog
	global.shell = shell
})
