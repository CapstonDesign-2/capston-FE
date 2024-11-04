import React from 'react';
import styled, { keyframes } from 'styled-components';
import homeImage from '../image/homeImage.png';
import MainLogo from '../image/Main_logo.png';
import { useNavigate } from 'react-router-dom';

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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: black;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 500px;
  height: auto;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.div`
  color: white;
  font-size: clamp(0.8rem, 2vw, 1rem);
  text-align: center;
`;

const QuestionText = styled.div`
  color: white;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  text-align: center;
  max-width: 90%;
`;

const ButtonSubtext = styled.div`
  color: #ffffff;
  font-size: clamp(0.8rem, 2vw, 1rem);
  text-align: center;
  max-width: 90%;
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
  color: #7878AB;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-shadow: none;
  -webkit-font-smoothing: antialiased;
`;

const Button = styled.button`
  position: relative;
  border: none;
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1.5rem, 4vw, 2.5rem);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  animation: ${glowEffect} 2s infinite;
  margin: 2rem 0;
  
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
    transform: scale(1.05);
    background: rgba(255, 255, 255, 1);
    ${ButtonText} {
      color: #6868AB;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CopyrightText = styled.div`
  color: #ECECEC;
  font-size: clamp(0.8rem, 2vw, 1.125rem);
  text-align: center;
  margin-top: auto;
  padding: 2rem 0;
`;

const FullScreenImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Divider = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 2px;
  background: #ECECEC;
  z-index: 2;
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mySpec');
  };

  return (
    <Container>
      <FullScreenImage 
        src={homeImage}
        alt="MySpec Check Background"
      />
      <ContentWrapper>
        <LogoContainer>
          <Logo src={MainLogo} alt="MySpec Logo" />
        </LogoContainer>
        <QuestionText>What is your computer spec today?</QuestionText>
        <ButtonSubtext>Press the button below to check my hardware spec</ButtonSubtext>
        <Divider />
        <Button onClick={handleButtonClick}>
          <ButtonText>MySpec</ButtonText>
        </Button>
        <CopyrightText>© MySpec team. All Rights Reserved.</CopyrightText>
      </ContentWrapper>
    </Container>
  );
};

export default LandingPage;