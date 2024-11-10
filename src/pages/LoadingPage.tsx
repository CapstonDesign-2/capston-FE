import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1A1E29;
`;

const loadingAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 98%;
  }
`;

const LoadingContainer = styled.div`
  width: 80%;
  max-width: 500px;
  height: 30px;
  background-color: #E3E3E3;
  border-radius: 20px;
  overflow: hidden;
`;

const LoadingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  margin-left: 3px;
  width: 5%;
  height: 80%;
  border-radius: 20px;
  background-color: #2E9BFF;
  animation: ${loadingAnimation} 2.5s ease-in-out forwards;
`;

const LoadingText = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: #ffffff;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate('/mySpec');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Loading>
      <LoadingContainer>
        <LoadingBar />
      </LoadingContainer>
      <LoadingText>하드웨어 스펙을 조사하는 중입니다...</LoadingText>
    </Loading>
  );
};

export default LoadingPage;