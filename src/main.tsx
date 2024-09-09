import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './style/index.css';
import { ErrorProvider } from './contexts/error-context.tsx';
import { ErrorDisplay } from './components/error/Error.tsx';
import StoreProvider from './providers/store-provider.tsx';
import ThemeProvider from './providers/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <StoreProvider>
        <ThemeProvider>
          <ErrorProvider>
            <App />
            <ErrorDisplay />
          </ErrorProvider>
        </ThemeProvider>
    </StoreProvider>
  // </StrictMode>,
)
