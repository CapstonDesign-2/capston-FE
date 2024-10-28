// LandingPage.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import homeImage from '../image/homeImage.png'

const glowEffect = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(245, 245, 250, 0.3),
                0 0 10px rgba(245, 245, 250, 0.2),
                0 0 15px rgba(245, 245, 250, 0.1);
  }
  50% {
    box-shadow: 0 0 10px rgba(245, 245, 250, 0.4),
                0 0 20px rgba(245, 245, 250, 0.3),
                0 0 30px rgba(245, 245, 250, 0.2);
  }
  100% {
    box-shadow: 0 0 5px rgba(245, 245, 250, 0.3),
                0 0 10px rgba(245, 245, 250, 0.2),
                0 0 15px rgba(245, 245, 250, 0.1);
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
  color: #7878AB;
  font-weight: 500;
  text-shadow: none;
  -webkit-font-smoothing: antialiased;
`;

const Button = styled.button`
  position: absolute;
  border: none;
  left: 50%;
  top: 75%;
  transform: translate(-50%, -50%);
  padding: 0.75rem 2.5rem;
  font-size: clamp(1rem, 2vw, 1.125rem);
  background: #F5F5FA;
  border-radius: 2rem;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  animation: ${glowEffect} 2s infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #F5F5FA, #e0e0e6);
    border-radius: 2rem;
    z-index: 0;
    filter: blur(10px);
    opacity: 0.7;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
    background: #FFFFFF;
    ${ButtonText} {
      color: #6868AB;
    }
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.98);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: black;
`;

const FullScreenImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`;

interface LandingPageProps {
  onSpecCheck?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSpecCheck }) => {
  return (
    <Container>
      <FullScreenImage 
        src={homeImage}
        alt="MySpec Check Background"
      />
      <Button onClick={onSpecCheck}>
        <ButtonText>MySpec</ButtonText>
      </Button>
    </Container>
  );
};

export default LandingPage;