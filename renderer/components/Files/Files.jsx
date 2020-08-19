import { useEffect, useState } from 'react'
var { fs, chokidar, recursive } = global

import styles from './Files.module.scss'

import Buttons from './Buttons/Buttons'

export default function Files(props) {
    var [pages, setPages] = useState([])
    var pagesPath = './pages'

    function readPagesFolder(callback) {
        recursive(pagesPath, (error, files) => {
            if (error) console.log(error)
            setPages(files)
            if (callback) callback()
        })
    }

    function openFile(path, callback) {
        fs.readFile(path, (error, data) => {
            if (error) console.log(error)
            var content = data.toString()
            props.setEditorContent(content)
            props.setOpenedPath(path)
            if (callback) callback(null, path, content)
        })
    }

    useEffect(() => {
        openFile('./pages/index.md')

        fs.readdir(pagesPath, 'utf8', (error, files) => {
            if (error) console.log(error)
            const watcher = chokidar.watch('./pages', {
                ignored: /(^|[\/\\])\../, // ignore dotfiles
                persistent: true
            })
            const log = console.log.bind(console)
            watcher
                .on('add', path => {
                    readPagesFolder()
                })
                .on('unlink', path => {
                    readPagesFolder()
                });
        })
    }, [])

    return <>
        <div className={styles.Files}>
            <div className={styles.list}>
                {pages.map((page, index) => (
                    <>
                        <a href="" onClick={(e) => {
                            e.preventDefault()
                            openFile(page)
                        }}>{page.replace(/pages/, '').replace(/\.md/, '').replace(/index/g, '')}</a>
                    </>
                ))}
            </div>
            <Buttons openedPath={props.openedPath} />
        </div>
    </>
}