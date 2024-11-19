import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingOverlay from './LoadingOverlay';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background: white;
  border-bottom: 1px solid #EAEAEA;
  box-sizing: border-box;
  max-width: 100vw;
  position: relative;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  text-decoration: none;
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem 2rem;
    gap: 1rem;
    border-bottom: 1px solid #EAEAEA;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    z-index: 1000;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: #666666;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  white-space: nowrap;
  padding: 0.5rem 0.5rem;

  &:hover {
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem 0;
  }
`;

const SpecButton = styled.button`
  background-color: #EA4C89;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #F082AC;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666666;

  @media (max-width: 768px) {
    display: block;
  }
`;

// 타입 정의 추가
interface SystemInfo {
  cpu: string;
  gpu: string;
  ram: string;
  deviceId: string;
}

interface ScoreInfo {
  cpuScore: number;
  gpuScore: number;
  ramScore: number;
  mySpecScore: number;
}

interface CombinedInfo {
  systemInfo: SystemInfo;
  scoreInfo: ScoreInfo;
}

const dummyScoreInfo: ScoreInfo = {
  "cpuScore": 99375,
  "gpuScore": 18567,
  "ramScore": 35788,
  "mySpecScore" : 2314
  }

const fetchSystemInfo = async (): Promise<CombinedInfo> => {
  try {
    const response = await fetch('/api2/api/system-info', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Windows App이 실행되고 있지 않습니다.');
    }
    
    const systemInfo = await response.json();
    localStorage.setItem('macAddress', systemInfo.deviceId);

    const result = {
      systemInfo,
      scoreInfo: dummyScoreInfo
    };
    
    return result;
  } catch (error) {
    console.error('통신 에러:', error);
    throw new Error('Windows App이 실행되고 있지 않습니다.');
  }
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { refetch, isLoading, data: cachedData } = useQuery({
    queryKey: ['systemInfo'],
    queryFn: fetchSystemInfo,
    enabled: false,
    retry: false,
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = async () => {
    try {
      // 캐시된 데이터가 있으면 바로 사용
      if (cachedData) {
        navigate('/mySpec', { state: cachedData });
        return;
      }

      // 캐시된 데이터가 없을 경우 새로 fetch
      const result = await refetch();
      
      // 에러 상태 확인
      if (result.error) {
        throw result.error;
      }
      
      // 데이터 존재 여부 확인
      if (!result.data) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
      }

      navigate('/mySpec', { state: result.data });
    } catch (error) {
      window.alert('Windows App을 먼저 실행해주세요!');
      console.error('Error fetching system info:', error);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <HeaderContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem'}}>
          <Logo to="/">MySpec</Logo>
          
          <MenuButton onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>

          <Nav isOpen={isOpen}>
            <NavLinks>
              <NavLink to="/hardware-performance">하드웨어별 성능 확인</NavLink>
              <NavLink to="/games">게임 스펙 확인</NavLink>
              <NavLink to="/hardware-ranking">하드웨어 랭킹</NavLink>
              <NavLink to="/about">About</NavLink>
            </NavLinks>
          </Nav>
        </div>
        <SpecButton onClick={handleButtonClick}>
          스펙 확인하기
        </SpecButton>
      </HeaderContainer>
    </>
  );
};

export default Header;