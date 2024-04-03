/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOMClient from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled, { createGlobalStyle } from 'styled-components';
import {
  init,
} from './index';
import Content from './components/Content';
import SplashScreen from './components/SplashScreen';
import { MyProvider, useMyContext } from './hooks/MyContext';

init({
  // debug: true,
  visualDebug: false
});

const AppContainer = styled.div`
  background-color: #000000;
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  const [view, setView] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setView(true);
    }, 1000);
  }, []);

  return (
    <React.StrictMode>
      <MyProvider>
        <AppContainer>
          <GlobalStyle />
          {
            view ? <Content /> : <SplashScreen />
          }
        </AppContainer>
      </MyProvider>
    </React.StrictMode>
  );
}

const root = ReactDOMClient.createRoot(document.querySelector('#root'));
root.render(<App />);
