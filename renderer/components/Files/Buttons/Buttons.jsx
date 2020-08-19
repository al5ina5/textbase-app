import { useState } from 'react'
var { fs, shelljs, shell } = global

import styles from './Button.module.scss'

export default function Buttons(props) {
    var [pagePath, setPagePath] = useState(false)
    var [addPageInput, setAddPageInput] = useState(false)

    function createFile() {
        var prompt = prompt('Path?')
        if (prompt != null) {
            alert(prompt)
        }
    }
    function nameToDomain(string) {
        string = string || ''

        return string
            .toLowerCase()
            .replace(/[^a-zA-Z0-9/ -]/gi, '')
            .replace(/\s+/gi, '-')
            .trim()
    }

    return <>
        <p>
            Enter a desired website path and click return to create a page.
        </p>

        <form onSubmit={(e) => {
            e.preventDefault()

            var page = pagePath
            if (!pagePath.startsWith('/')) page = '/' + page
            if (pagePath.endsWith('/')) page = page.substring(0, page.length - 1)

            var fileSplit = page.split('/')
            var targetFile = fileSplit.pop() + '.md'
            var targetDirectory = fileSplit.join('/')

            fs.exists('./pages/' + targetDirectory + '/' + targetFile, (exists) => {
                if (exists) {
                    return alert('That page is already taken.')
                }

                fs.mkdirp('./pages/' + targetDirectory, (error) => {
                    if (error) return console.log(error)

                    fs.exists('./pages/' + targetDirectory + '.md', (exists) => {
                        if (exists) fs.rename('./pages/' + targetDirectory + '.md', './pages/' + targetDirectory + '/index.md')
                    })

                    fs.writeFile('./pages/' + targetDirectory + '/' + targetFile, `# New Page\r\rThis is your new page at \`${page}\`.`, () => {
                        props.openFile('./pages/' + targetDirectory + '/' + targetFile)
                    })

                    fs.exists('./pages/' + targetDirectory + '/index.md', (exists) => {
                        if (exists) return

                        fs.writeFile('./pages/' + targetDirectory + '/index.md', `# New Page\r\rThis is your new page at \`${targetDirectory}\`.`, () => {
                            props.openFile('./pages/' + targetDirectory + '/index.md')
                        })
                    })

                })
            })
        }}>
            <input type="text" placeholder="/about" onChange={(e) => {
                setPagePath(e.target.value)
            }} />

            {pagePath && <>
                <button>Create Page</button></>}
        </form>

        <button
            style={{ backgroundColor: '#00afff' }}
            onClick={(e) => {
                e.preventDefault()
                console.log(props.openedPath)
                // shell.openExternal(`http://localhost:4000/${pagePath}`)
            }}>Preview Website</button>
        <button
            style={{ backgroundColor: '#60c27d' }}
            onClick={(e) => {
            }}>Deploy Website</button>
    </>
}