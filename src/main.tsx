import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './common/styles/index.css';
import App from './common/components/App';
import { BrowserRouter } from 'react-router';
import { PrimeReactProvider } from 'primereact/api';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
