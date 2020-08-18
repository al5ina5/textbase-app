const { fs } = global
import { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-nord_dark'

import styles from './Editor.module.scss'

export default function Editor(props) {
    useEffect(() => {
        console.log(props.openedPath)
    }, [props.openedPath])

    var timer = null
    return <>
        <div className={styles.Editor}>
            <AceEditor
                mode="markdown"
                theme="nord_dark"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                showGutter={false}
                placeholder="Start typing your page here..."
                onChange={(content) => {
                    console.log(content)

                    fs.writeFile(props.openedPath, content, (error) => {
                        if (error) return console.log(error)
                        console.log(`${props.openedPath} has been updated.`)
                    })
                    // clearInterval(timer)
                    // timer = setTimeout(() => {
                    //     fs.writeFile(props.openedPath, content, (error) => {
                    //         if (error) return console.log(error)
                    //         console.log(`${props.openedPath} has been updated.`)
                    //     })
                    // }, 100)
                }}
                value={props.editorContent}
                fontSize={'inherit'}
                width="100%"
                height="100%"
                showPrintMargin={false}
                wrapEnabled={true}
                style={{
                    padding: '1rem'
                }}
            />
        </div>
    </>
}