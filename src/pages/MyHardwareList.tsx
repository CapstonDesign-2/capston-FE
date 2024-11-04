import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { HardwareSpec, StyledIconContainerProps } from '../types';

import cpuImage from "../image/cpu.svg";
import gpuImage from "../image/gpu.png";
import ramImage from "../image/ram.png";


const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #F9FAFB;
`;

const MainContent = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1rem;
`;

const ResultsContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const ResultsTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const HardwareItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #EAEAEA;

  &:last-child {
    border-bottom: none;
  }
`;

const IconContainer = styled.div<StyledIconContainerProps>`
  width: 48px;
  height: 48px;
  background-color: ${props => {
    switch (props.type) {
      case 'CPU': return '#E3F2FD';
      case 'GPU': return '#FCE4EC';
      case 'RAM': return '#E8F5E9';
      default: return '#F5F5F5';
    }
  }};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HardwareInfo = styled.div`
  flex: 1;
`;

const HardwareType = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const HardwareName = styled.div`
  font-size: 1rem;
  color: #333;
`;

const DeviceId = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

// Hardware Item Component
const HardwareItemComponent: React.FC<HardwareSpec> = ({ type, modelName, iconSrc }) => (
  <HardwareItem>
    <IconContainer type={type}>
      <img src={iconSrc} alt={type} width={24} height={24} />
    </IconContainer>
    <HardwareInfo>
      <HardwareType>{type}</HardwareType>
      <HardwareName>{modelName}</HardwareName>
    </HardwareInfo>
  </HardwareItem>
);

// Main Page Component
const HardwareSpecPage: React.FC = () => {
  const hardwareItems: HardwareSpec[] = [
    { type: 'CPU', modelName: 'cpu Model name', iconSrc: cpuImage },
    { type: 'GPU', modelName: 'gpu Model name', iconSrc: gpuImage },
    { type: 'RAM', modelName: 'ram Model name', iconSrc: ramImage },
  ];

  return (
    <PageContainer>
      <Header />
      
      <MainContent>
        <TitleSection>
          <Title>My Hardware Spec</Title>
          <Subtitle>
            We checked your hardware information for cpu, gpu, ram and you can get each hardware ranks except for mac.
          </Subtitle>
        </TitleSection>

        <SearchBar />

        <ResultsContainer>
          <ResultsTitle>3 results here</ResultsTitle>
          
          {hardwareItems.map((item, index) => (
            <HardwareItemComponent
              key={index}
              type={item.type}
              modelName={item.modelName}
              iconSrc={item.iconSrc}
            />
          ))}
        </ResultsContainer>

        <DeviceId>
          My Hardware device ID : example code 1234567
        </DeviceId>
      </MainContent>
    </PageContainer>
  );
};

export default HardwareSpecPage;