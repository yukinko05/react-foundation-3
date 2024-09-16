import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@unocss/reset/eric-meyer.css';

createRoot(document.getElementById('root')! as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
