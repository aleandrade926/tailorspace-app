import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SearchDigital from './pages/SearchDigital.jsx';
import FitOutStudio from './pages/FitOutStudio.jsx';
import Infra from './pages/Infra.jsx';

function AppLayout() {
  const location = useLocation();
  const isInfra = location.pathname === '/infra';

  if (isInfra) {
    return (
      <Routes>
        <Route path="/infra" element={<Infra />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search-digital" element={<SearchDigital />} />
          <Route path="/fit-out-studio" element={<FitOutStudio />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
