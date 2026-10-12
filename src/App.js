import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main.jsx"
import Block from './pages/Block.jsx';
import Test from './pages/Test.jsx';

import './App.css';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/block" element={<Block/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
