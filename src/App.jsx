import './App.css';
import { useRef } from 'react';
import Editor from './components/editor/Editor';
import ModuleExplorer from './components/moduleExplorer/ModuleExplorer';
import { useModInfo } from './hooks/useModInfo';

export default function App() {
  const fileInput = useRef();
  const { modDescriptor, loadModFromZipFile } = useModInfo();
  const onLoadModButtonClicked = () => {
    fileInput.current.click();
  };
  const onNewModButtonClicked = () => {
    console.log('new mod');
  };
  const onSaveModButtonClicked = () => {
    console.log('save mod');
  };
  const handleFileSelected = async () => {
    const zipFile = fileInput.current.files[0];
    await loadModFromZipFile(zipFile);
  };

  if (modDescriptor) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%', minWidth: '80%', overflow: 'scroll', height: '100vh' }}>
          <Editor />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '20%',
            maxWidth: '20%',
            height: '100vh',
          }}
        >
          <h2>{modDescriptor.name}</h2>
          <ModuleExplorer modDescriptor={modDescriptor} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 10,
            }}
          >
            <button onClick={onSaveModButtonClicked} style={{ width: '100%', marginBottom: 5 }}>
              Save
            </button>
            <input
              type="file"
              id="file"
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={handleFileSelected}
              accept=".zip"
            />
            <button onClick={onLoadModButtonClicked} style={{ width: '100%', marginBottom: 5 }}>
              Load
            </button>
            <button onClick={onNewModButtonClicked} style={{ width: '100%' }}>
              New
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: 32 }}>Paladin's Oath Mod Editor</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <input
          type="file"
          id="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleFileSelected}
          accept=".zip"
        />
        <button onClick={onLoadModButtonClicked} style={{ marginBottom: 5 }}>
          Load existing mod
        </button>
        <button onClick={onNewModButtonClicked}>New mod</button>
      </div>
    </div>
  );
}
