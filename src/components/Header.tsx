import { useState } from 'react'
import { ClipboardIcon } from './ClipboardIcons';
import { MarkdownIcon } from './MarkdownIcon';

interface HeaderProps {
  value: string
}

export function Header(props: HeaderProps) {
  const [clipboardStatus, setClipboardStatus] = useState(false)

  function handleDownloadFile() {
    const blob = new Blob([props.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "download.md";
    link.href = url;
    link.click();
  }

  function handleClipboardCopy() {
    setClipboardStatus(true)
    navigator.clipboard.writeText(props.value)

    setTimeout(() => {
      setClipboardStatus(false)
    }, 3000)
  }

  return (
    <header>
      <div className="title">
        <MarkdownIcon
          color="#dedede"
        />
        <h1>Markdown Preview</h1>
      </div>

      <div className="options">
        <button
          onClick={handleClipboardCopy}
          disabled={props.value === ''}
          className="clipboard-button"
          title="Copy to clipboard"
        >
          {clipboardStatus ? 'Copied' : 'Copy to Clipboard'}
          <ClipboardIcon
            color="#dedede"
            statusClick={clipboardStatus}
          />
        </button>

        <button
          className="download-button"
          onClick={handleDownloadFile}
          disabled={props.value === ''}
        >
          Download
        </button>
      </div>
    </header>
  )
}