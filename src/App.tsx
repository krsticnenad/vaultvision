import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from './pages/search-page';
import VaultPage from './pages/vault-page';
import NotFoundPage from './pages/not-found-page';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/search' Component={SearchPage} />
          <Route path='/' element={<Navigate to="/search" replace />}  />
          <Route path='/search/cdp/:id' Component={VaultPage} />
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </Router>
    </>
  )
}

export default App
