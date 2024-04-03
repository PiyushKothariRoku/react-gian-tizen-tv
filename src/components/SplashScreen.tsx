import React from 'react'
import styled from 'styled-components'
const logo = require('../assets/splash_screen.jpg').default;

const SplashContainer = styled.div`
position: absolute;
  width: 100vw;
  height: 100vh;
  display: grid;
  placeItems: center;
  alignItems: center;
`;
const SplashImage = styled.img`
position: relative;
  height: 100%;
  width: 100%;
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <SplashImage crossOrigin="anonymous" src={logo} alt="GianTV" />
    </SplashContainer>
  )
}

export default SplashScreen