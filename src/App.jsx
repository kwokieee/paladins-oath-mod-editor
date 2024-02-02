import './App.css';
import { useRef } from 'react';
import { Editor } from './components/editor/Editor';
import { ModuleExplorer } from './components/moduleExplorer/ModuleExplorer';
import { useModInfoStore } from './hooks/useModInfoStore';
import { Box, Button, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  const fileInput = useRef();
  const modInfoStore = useModInfoStore();
  const onImportModButtonClicked = () => {
    fileInput.current.click();
  };
  const onNewModButtonClicked = () => {
    // TODO
    console.log('new mod');
  };
  const onExportModButtonClicked = () => {
    modInfoStore.export();
  };
  const handleFileSelected = async () => {
    const zipFile = fileInput.current.files[0];
    try {
      // await loadModFromZipFile(zipFile);
      await modInfoStore.loadModFrom(zipFile);
    } catch (e) {
      // TODO: Show error message in snackbar
      console.error('Failed to load mod from zip file');
      console.error(e);
    }
  };

  if (modInfoStore.hasMod) {
    console.log(modInfoStore);
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
          <h2>{modInfoStore?.modDescriptor?.name}</h2>
          <ModuleExplorer />
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 10,
            }}
          >
            <Button
              color="primary"
              onClick={onExportModButtonClicked}
              style={{ width: '100%', marginBottom: 5 }}
            >
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
            <Button onClick={onImportModButtonClicked} style={{ width: '100%', marginBottom: 5 }}>
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
        <Button color="primary" onClick={onImportModButtonClicked} style={{ marginBottom: 5 }}>
          Import existing mod
        </Button>
        <Button onClick={onNewModButtonClicked}>New mod</Button>
      </Box>
    </Box>
  );
});
