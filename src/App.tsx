import React from 'react';
import './App.css';
import MyHardwareList from './pages/MyHardwareList';
import LandingPage from './pages/LandingPage';
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
      <MyHardwareList/>
      <Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
