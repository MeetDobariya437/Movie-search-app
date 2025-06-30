import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Fevorite from './Fevorite.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/fevorite" element={<Fevorite />} />
    </Routes>
  </BrowserRouter>
);
