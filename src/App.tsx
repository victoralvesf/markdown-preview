import { useState, useEffect } from 'react'
import { CustomEditor } from './components/CustomEditor';
import { Header } from './components/Header';

import { Markdown } from './components/Markdown';

function App() {
  const [editorValue, setEditorValue] = useState('')

  useEffect(() => {
    const savedText = localStorage.getItem('markdown-preview-saved-text')

    if (savedText) {
      setEditorValue(savedText)
    }
  }, [])

  function handleEditorChange(value: string | undefined) {
    const safeValue = value ?? ''
    setEditorValue(safeValue)
    localStorage.setItem('markdown-preview-saved-text', safeValue)
  }

  return (
    <>
      <Header value={editorValue} />
      <main>
        <CustomEditor
          value={editorValue}
          onChange={handleEditorChange}
        />
        <Markdown
          editorValue={editorValue}
        />
      </main>
    </>
  )
}

export default App
