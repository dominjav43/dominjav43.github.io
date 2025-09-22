import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Resume from './Resume.tsx';
import './Resume.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Resume />
  </StrictMode>
);
