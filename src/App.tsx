import React from 'react';
import './App.css';

import MyHardwareList from './pages/MyHardwareList';
import LandingPage from './pages/LandingPage';
import LoadingPage from './pages/LoadingPage';
import HardwarePerformance from './pages/HardwarePerformance';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }
`;

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mySpec" element={<MyHardwareList />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/hardware-performance" element={<HardwarePerformance />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
