import Editor from '@monaco-editor/react'
import useFontFaceObserver from 'use-font-face-observer'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { DefaultTheme } from '../theme'

type Monaco = typeof monaco

interface EditorProps {
  value: string
  onChange: (value: string | undefined) => void
}

export function CustomEditor(props: EditorProps) {
  const isFontLoaded = useFontFaceObserver([
    { family: 'Fira Code' },
  ])

  function handleEditorDidMount(monaco: Monaco) {
    monaco.editor.defineTheme('tomorrow-night-eighties', DefaultTheme)

    if (isFontLoaded) {
      monaco.editor.remeasureFonts()
    }
  }

  return (
    <Editor
      options={{
        wordWrap: 'on',
        minimap: {
          enabled: false
        },
        fontFamily: 'Fira Code',
        fontSize: 16,
        fontWeight: '500',
        fontLigatures: true
      }}
      width="100%"
      height="calc(100vh - 60px)"
      defaultLanguage="markdown"
      theme="tomorrow-night-eighties"
      beforeMount={handleEditorDidMount}
      onChange={props.onChange}
      defaultValue={props.value}
    />
  )
}