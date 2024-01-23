import './App.css';
import { useRef } from 'react';
import Editor from './components/editor/Editor';
import ModuleExplorer from './components/moduleExplorer/ModuleExplorer';
import { useModInfo } from './hooks/useModInfo';
import { Box, Button, Typography } from '@mui/material';

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
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          style={{
            width: '80%',
            minWidth: '80%',
            maxWidth: '80%',
            overflow: 'scroll',
            height: '100vh',
            paddingRight: 30,
          }}
        >
          <Editor />
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            minWidth: '20%',
            width: '20%',
            maxWidth: '20%',
            height: '100vh',
          }}
        >
          <h2>{modDescriptor.name}</h2>
          <ModuleExplorer modDescriptor={modDescriptor} />
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 10,
            }}
          >
            <Button color='primary' onClick={onSaveModButtonClicked} style={{ width: '100%', marginBottom: 5 }}>
              Export
            </Button>
            <input
              type="file"
              id="file"
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={handleFileSelected}
              accept=".zip"
            />
            <Button onClick={onLoadModButtonClicked} style={{ width: '100%', marginBottom: 5 }}>
              Import
            </Button>
            <Button onClick={onNewModButtonClicked} style={{ width: '100%' }}>
              New
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography style={{ fontSize: 32 }}>Paladin's Oath Mod Editor</Typography>
      <Box
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
        <Button color='primary' onClick={onLoadModButtonClicked} style={{ marginBottom: 5 }}>
          Import existing mod
        </Button>
        <Button onClick={onNewModButtonClicked}>New mod</Button>
      </Box>
    </Box>
  );
}
