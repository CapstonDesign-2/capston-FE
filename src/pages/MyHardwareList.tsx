import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { HardwareSpec, StyledIconContainerProps } from '../types';
import { useLocation } from 'react-router-dom';

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
  justify-content: space-between;
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

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052a3;
  }
`;

const DownloadSection = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

// Hardware Item Component
const HardwareLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Score = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #EA4C89;
`;

const TotalScore = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #EA4C89;
`;

const HardwareItemComponent: React.FC<HardwareSpec & { score?: number }> = ({ 
  type, 
  modelName, 
  iconSrc,
  score 
}) => (
  <HardwareItem>
    <HardwareLeftSection>
      <IconContainer type={type}>
        <img src={iconSrc} alt={type} width={24} height={24} />
      </IconContainer>
      <HardwareInfo>
        <HardwareType>{type}</HardwareType>
        <HardwareName>{modelName}</HardwareName>
      </HardwareInfo>
    </HardwareLeftSection>
    {score !== undefined && <Score>{score.toLocaleString()} 점</Score>}
  </HardwareItem>
);

// HardwareSpec 타입을 확장한 새로운 타입 정의
type HardwareItemType = HardwareSpec & { score?: number };

// Main Page Component
const HardwareSpecPage: React.FC = () => {
  const location = useLocation();
  const { systemInfo, scoreInfo } = location.state || {};

  const windowsAppUrl = "https://github.com/CapstonDesign-2/capston-FE/releases/download/zip/mySpec-win32-x64-1.0.0.zip";

  const hardwareItems: HardwareItemType[] = [
    { 
      type: 'CPU' as const,  // as const를 사용하여 리터럴 타입으로 지정
      modelName: systemInfo?.cpu || 'Windows App에서 정보를 가져와주세요', 
      iconSrc: cpuImage,
      score: scoreInfo?.cpuScore
    },
    { 
      type: 'GPU' as const,
      modelName: systemInfo?.gpu || 'Windows App에서 정보를 가져와주세요', 
      iconSrc: gpuImage,
      score: scoreInfo?.gpuScore
    },
    { 
      type: 'RAM' as const,
      modelName: systemInfo?.ram || 'Windows App에서 정보를 가져와주세요', 
      iconSrc: ramImage,
      score: scoreInfo?.ramScore
    },
  ];

  return (
    <PageContainer>
      <Header />
      
      <MainContent>
        <TitleSection>
          <Title>My Hardware Spec</Title>
          <Subtitle>
            {systemInfo 
              ? '현재 사용중인 하드웨어 정보입니다.'
              : 'Windows App을 실행하고 스펙 확인하기 버튼을 눌러주세요.'}
          </Subtitle>
          <DownloadSection>
            <DownloadButton href={windowsAppUrl} download>
              Download Windows App
            </DownloadButton>
          </DownloadSection>
        </TitleSection>

        <ResultsContainer>
          <ResultsTitle>하드웨어 정보</ResultsTitle>
          
          {hardwareItems.map((item, index) => (
            <HardwareItemComponent
              key={index}
              {...item}
            />
          ))}

          {scoreInfo && (
            <TotalScore>
              My Spec Score: {scoreInfo.mySpecScore.toLocaleString()} 점
            </TotalScore>
          )}
        </ResultsContainer>

        <DeviceId>
          My Hardware device ID : {systemInfo?.deviceId || '정보를 가져오는 중...'}
        </DeviceId>
      </MainContent>
    </PageContainer>
  );
};

export default HardwareSpecPage;