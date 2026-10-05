import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main.jsx"

import './App.css';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
