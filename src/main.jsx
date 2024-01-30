import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { StoreProvider } from './StoreContext.jsx';
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider>
        <App />
      </StoreProvider>
    </MUIThemeProvider>
  </React.StrictMode>,
);
