import { useState } from 'react'
import dynamic from 'next/dynamic'

const Files = dynamic(() => import('../components/Files/Files'))
const Editor = dynamic(() => import('../components/Editor/Editor'))
const Console = dynamic(() => import('../components/Console/Console'))

export default function Index() {
    var [openedPath, setOpenedPath] = useState('')
    var [editorContent, setEditorContent] = useState('')

    return <>
        <Files setEditorContent={setEditorContent} setOpenedPath={setOpenedPath} />
        <Editor editorContent={editorContent} openedPath={openedPath} />
        {/* <Console /> */}
    </>
}