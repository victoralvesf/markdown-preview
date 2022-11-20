import { MarkdownIcon } from './MarkdownIcon';

interface HeaderProps {
  value: string
}

export function Header(props: HeaderProps) {
  function handleDownloadFile() {
    const blob = new Blob([props.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "download.md";
    link.href = url;
    link.click();
  }

  return (
    <header>
      <div className="title">
        <MarkdownIcon
          color="#dedede"
        />
        <h1>Markdown Preview</h1>
      </div>

      <button onClick={handleDownloadFile} disabled={props.value === ''}>
        Download
      </button>
    </header>
  )
}